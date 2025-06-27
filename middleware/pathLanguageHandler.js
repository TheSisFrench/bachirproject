// middleware/pathLanguageHandler.js
const parser = require('accept-language-parser'); // Keep if you still want Accept-Language as a fallback here

function pathLanguageHandler(req, res, next) {
    const supportedLanguages = ['en', 'fr']; // Your supported languages
    const siteDefaultLang = 'en';           // Site's ultimate fallback
    let determinedLang = siteDefaultLang;

    console.log('\n--- Path Language Handler ---');
    console.log(`  Raw req.path: ${req.path}`);
    console.log(`  req.params.lang: ${req.params.lang}`);
    console.log(`  Session lang before processing: ${req.session ? req.session.lang : 'N/A'}`);

    // Priority 1: Language code from URL path parameter (e.g., /en/gallery)
    if (req.params.lang && supportedLanguages.includes(req.params.lang.toLowerCase())) {
        determinedLang = req.params.lang.toLowerCase();
        console.log(`  1. Language from path parameter: '${determinedLang}'`);
        // Ensure session is consistent with the path
        if (req.session) {
            if (req.session.lang !== determinedLang) {
                req.session.lang = determinedLang;
                console.log(`     Updated session lang to '${determinedLang}' to match path.`);
            } else if (!req.session.lang) { // Initialize if session lang isn't set yet
                req.session.lang = determinedLang;
                console.log(`     Initialized session lang to '${determinedLang}' from path.`);
            }
        }
    }
    // Priority 2: Session (if middleware is used on a route without :lang, or if :lang was invalid)
    // This block might be less relevant if your router strictly enforces /:lang(en|fr)
    // and this middleware is only used on those routes.
    else if (req.session && req.session.lang && supportedLanguages.includes(req.session.lang)) {
        determinedLang = req.session.lang;
        console.log(`  2. Language from session (path param invalid or missing): '${determinedLang}'`);
    }
    // Priority 3: Accept-Language header (primarily for the initial '/' redirect, but can be a fallback here too)
    else if (req.headers['accept-language']) {
        console.log(`  3. Checking 'Accept-Language' header: ${req.headers['accept-language']}`);
        try {
            const browserPreferences = parser.parse(req.headers['accept-language']);
            for (const pref of browserPreferences) {
                const baseLang = pref.code.toLowerCase();
                if (supportedLanguages.includes(baseLang)) {
                    determinedLang = baseLang;
                    console.log(`     Found supported browser lang: '${determinedLang}'`);
                    if (req.session && !req.session.lang) {
                        req.session.lang = determinedLang;
                        console.log(`     Stored browser-derived language '${determinedLang}' in session.`);
                    }
                    break;
                }
            }
            if (determinedLang === siteDefaultLang && browserPreferences.length > 0 && !supportedLanguages.includes(determinedLang)) {
                 console.log('     No supported language found in browser preferences that matches our site languages.');
            }
        } catch (error) {
            console.error('     Error parsing Accept-Language header:', error);
        }
    }
    // Priority 4: Site default (if all else fails)
    else {
        console.log(`  4. Using site default language: '${siteDefaultLang}'`);
    }

    // If after all checks, determinedLang somehow isn't supported, force site default.
    if (!supportedLanguages.includes(determinedLang)) {
        console.warn(`     Determined language '${determinedLang}' is not supported. Forcing default '${siteDefaultLang}'.`);
        determinedLang = siteDefaultLang;
    }

    // Ensure session is initialized with a valid language if it wasn't already.
    if (req.session && !req.session.lang) {
        req.session.lang = determinedLang;
        console.log(`     Final initialization of session lang to '${determinedLang}'.`);
    }

        console.log(`PATH_HANDLER_DEBUG: Setting res.locals.currentLanguage to '${determinedLang}'`);

    // --- SET RES.LOCALS ---
    res.locals.currentLanguage = determinedLang;
    res.locals.supportedLanguages = supportedLanguages; // Good to have for EJS if needed
    res.locals.basePathWithLang = `/${determinedLang}`; // e.g., /en or /fr

    // queryParams will be for any query strings *on the current URL*, e.g. /en/search?term=art
    // We'll use this to construct queryParamsString below.
    // res.locals.queryParams = { ...req.query }; // You already have this, which is fine but not directly used by switcher string.

    // --- >>> ADD THIS SECTION <<< ---
    // Calculate and set originalPathWithoutLang and queryParamsString for the language switcher
    const langPrefixInPath = `/${determinedLang}`;
    let originalPathWithoutLang = '/'; // Default to root

    if (req.path.startsWith(langPrefixInPath)) {
        const pathAfterLang = req.path.substring(langPrefixInPath.length);
        originalPathWithoutLang = (pathAfterLang === '' || pathAfterLang === '/') ? '/' : pathAfterLang;
    } else {
        console.warn(`  WARNING (pathLanguageHandler): req.path '${req.path}' did not start with expected lang prefix '${langPrefixInPath}'.`);
        originalPathWithoutLang = req.path; // Fallback: use full path if no lang prefix found (might need adjustment based on use cases)
                                        // Or keep as '/': originalPathWithoutLang = '/';
    }
    res.locals.originalPathWithoutLang = originalPathWithoutLang;

    const queryString = Object.keys(req.query).length > 0 ? '?' + new URLSearchParams(req.query).toString() : '';
    res.locals.queryParamsString = queryString;
    // --- >>> END OF ADDED SECTION <<< ---

    console.log(`  RES.LOCALS SET (pathLanguageHandler):`);
    console.log(`    currentLanguage: '${res.locals.currentLanguage}'`);
    console.log(`    basePathWithLang: '${res.locals.basePathWithLang}'`);
    console.log(`    originalPathWithoutLang: '${res.locals.originalPathWithoutLang}'`); // For switcher
    console.log(`    queryParamsString: '${res.locals.queryParamsString}'`);         // For switcher
    console.log('--- End Path Language Handler ---\n');
    next();
}

module.exports = pathLanguageHandler;