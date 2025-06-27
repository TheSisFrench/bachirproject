// helpers/i18nUIHelper.js
const fs = require('fs');
const path = require('path');

// A simple in-memory cache to avoid reading the JSON files on every single request.
const loadedTranslations = {};

/**
 * Loads and parses a JSON translation file for a given language.
 * Caches the result in memory for subsequent requests.
 * @param {string} lang - The language code (e.g., 'en', 'fr').
 * @returns {object} The parsed JSON object for the language, or an empty object.
 */
function loadTranslations(lang) {
    // If translations for this language are already in our cache, return them immediately.
    if (loadedTranslations[lang]) {
        return loadedTranslations[lang];
    }

    try {
        // Construct the full path to the language file.
        // path.join handles creating the correct path separators for any OS.
        // __dirname is the directory of the current file (i.e., 'helpers').
        // '..' goes up one level to your project root.
        // 'locales' goes into your locales directory.
        const filePath = path.join(__dirname, '..', 'locales', `${lang}.json`);

        // Check if the file actually exists before trying to read it.
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const translations = JSON.parse(fileContent);

            // Store the loaded translations in the cache for next time.
            loadedTranslations[lang] = translations;
            return translations;
        } else {
            console.warn(`i18nUIHelper: Translation file not found for language '${lang}' at ${filePath}`);
            // Cache an empty object so we don't try to find the file again for this language.
            loadedTranslations[lang] = {};
            return {};
        }
    } catch (error) {
        console.error(`i18nUIHelper: Error loading or parsing translation file for language '${lang}':`, error);
        // Cache an empty object on error to prevent repeated failures.
        loadedTranslations[lang] = {};
        return {};
    }
}

/**
 * An Express middleware that provides an internationalization (i18n) function 't'
 * to the EJS templates via res.locals.
 */
function i18nUiMiddleware(req, res, next) {
    // Get the current language from res.locals (which should have been set by pathLanguageHandler).
    // Default to 'en' if it's not set for any reason.
    const currentLang = res.locals.currentLanguage || 'en';

    // Load the translations for the current language and the default/fallback language.
    const translationsForCurrentLang = loadTranslations(currentLang);
    const defaultLangTranslations = loadTranslations('en'); // Assuming 'en' is your primary fallback

    // Define the 't' (translate) function and attach it to res.locals.
    // This makes 't' available as a global-like function in all EJS templates for this request.
    res.locals.t = function(key, options = {}) {
        let translation;

        // 1. Try to find the translation key in the current language's file.
        if (translationsForCurrentLang && translationsForCurrentLang[key] !== undefined) {
            translation = translationsForCurrentLang[key];
        }
        // 2. If not found, fall back to the default language (English).
        else if (defaultLangTranslations && defaultLangTranslations[key] !== undefined) {
            translation = defaultLangTranslations[key];
            if (currentLang !== 'en') { // Log a warning only if we are not already on the default language.
                 console.warn(`i18nUIHelper (t): UI Key '${key}' not found in '${currentLang}', using default 'en'.`);
            }
        }

        // 3. If the key is still not found in any language file, return a helpful placeholder.
        if (translation === undefined) {
            console.warn(`i18nUIHelper (t): UI Translation key '${key}' not found in '${currentLang}' or any fallback language.`);
            // Return a default value passed in options, or the key itself in brackets.
            return options.defaultValue || `[${key}]`;
        }

        // 4. (Optional but useful) Handle variable interpolation.
        // This allows strings in your JSON like "Welcome, {{name}}!"
        // Usage in EJS: t('welcome_message', { vars: { name: 'Will' } })
        if (options.vars && typeof options.vars === 'object') {
            for (const varKey in options.vars) {
                // Use a regular expression with the 'g' flag to replace all occurrences.
                translation = translation.replace(new RegExp(`{{\\s*${varKey}\\s*}}`, 'g'), options.vars[varKey]);
            }
        }

        return translation;
    };

    // All setup is done, pass control to the next middleware or route handler.
    next();
}

// Export the middleware so it can be imported in server.js
module.exports = {
    i18nUiMiddleware
};