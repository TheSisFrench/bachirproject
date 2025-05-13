// middleware/languageHandler.js
const parser = require('accept-language-parser'); // For parsing Accept-Language header

function languageHandler(req, res, next) {
    // --- STEP 0: Setup and Definitions ---
    const supportedLanguages = ['en', 'fr']; // Languages your application actually supports
    const siteDefaultLang = 'fr';                 // Your website's ultimate fallback language
    let determinedLang = siteDefaultLang;         // Initialize with the site default. This will be updated if a higher priority method finds a language.

    console.log('\n--- Language Detection Cycle ---'); // For debugging each request

    // --- STEP 1: Explicit User Choice via URL Parameter ---
    // Highest priority: Has the user just clicked a link like /page?lang=fr to explicitly set the language?
    console.log(`1. Checking URL query parameter 'lang': ${req.query.lang}`);
    if (req.query.lang && supportedLanguages.includes(req.query.lang.toLowerCase())) {
        // req.query.lang exists and is one of our supported languages (case-insensitive check)
        determinedLang = req.query.lang.toLowerCase();
        console.log(`   Found valid language in URL: '${determinedLang}'. This will be used.`);

        // Persist this choice: Store it in the user's session so it's remembered for subsequent requests.
        if (req.session) {
            req.session.lang = determinedLang;
            console.log(`   Stored '${determinedLang}' in session.`);
        } else {
            console.warn('   Session not available to store language preference from URL.');
        }
    } else {
        console.log('   No valid language found in URL query parameter or parameter not present.');

        // --- STEP 2: User Preference Stored in Session ---
        // If no URL parameter, check if a language was previously set and stored in the session.
        console.log(`2. Checking session for 'lang': ${req.session ? req.session.lang : 'N/A (no session)'}`);
        if (req.session && req.session.lang && supportedLanguages.includes(req.session.lang)) {
            // Session exists, session.lang exists, and it's a supported language.
            determinedLang = req.session.lang;
            console.log(`   Found valid language in session: '${determinedLang}'. This will be used.`);
        } else {
            console.log('   No valid language found in session or session not available.');

            // --- STEP 3: Browser's Accept-Language Header ---
            // If no URL param & no session preference, try to guess from the browser's settings.
            // This is primarily for a user's first visit before they've made a choice or had one stored.
            console.log(`3. Checking 'Accept-Language' header: ${req.headers['accept-language']}`);
            if (req.headers['accept-language']) {
                try {
                    const browserPreferences = parser.parse(req.headers['accept-language']);
                    // browserPreferences is an array like:
                    // [ { code: 'fr', region: 'CH', quality: 1 }, { code: 'en', quality: 0.9 } ]
                    // ordered by browser's preference (highest quality first).

                    console.log('   Parsed browser preferences:', JSON.stringify(browserPreferences));
                    let foundSupportedBrowserLang = false;
                    for (const pref of browserPreferences) {
                        const baseLang = pref.code.toLowerCase(); // e.g., 'fr' from 'fr-CH' or 'fr'
                        if (supportedLanguages.includes(baseLang)) {
                            determinedLang = baseLang;
                            foundSupportedBrowserLang = true;
                            console.log(`   Found supported language from browser preferences: '${determinedLang}'. This will be used.`);

                            // Optionally, store this initial browser-derived language in the session.
                            // This means we don't have to parse Accept-Language on every subsequent request for this session
                            // if the user doesn't make an explicit choice.
                            if (req.session) {
                                req.session.lang = determinedLang;
                                console.log(`   Stored browser-derived language '${determinedLang}' in session.`);
                            }
                            break; // Stop checking once we find the first (highest priority) supported language
                        }
                    }
                    if (!foundSupportedBrowserLang) {
                        console.log('   No supported language found in browser preferences that matches our site languages.');
                        // determinedLang remains the siteDefaultLang set at the beginning.
                    }
                } catch (error) {
                    console.error('   Error parsing Accept-Language header:', error);
                    // If parsing fails, determinedLang remains the siteDefaultLang.
                    console.log(`   Falling back to site default ('${siteDefaultLang}') due to parsing error.`);
                }
            } else {
                console.log('   Accept-Language header not present.');
                // determinedLang remains the siteDefaultLang.
                console.log(`   Falling back to site default ('${siteDefaultLang}').`);
            }
        }
    }

    // --- STEP 4: Site's Default Language (Implicit Fallback) ---
    // If determinedLang is still the siteDefaultLang at this point, it means none of the higher-priority
    // methods yielded a different supported language. The variable `determinedLang` was initialized
    // to `siteDefaultLang`, so no explicit action is needed here unless we want to log or initialize the session.
    console.log(`4. Final determined language before setting res.locals: '${determinedLang}'`);

    // If the session exists but doesn't have a language set yet, and we ended up with the default,
    // we can initialize the session language with this default.
    if (req.session && !req.session.lang && determinedLang === siteDefaultLang) {
        req.session.lang = siteDefaultLang;
        console.log(`   Initialized session with site default language: '${siteDefaultLang}'`);
    }


    // --- STEP 5: Make Language Information Available ---
    // `res.locals` makes variables accessible in your EJS templates for the current request.
    res.locals.currentLanguage = determinedLang;
    res.locals.queryParams = { ...req.query }; // For helping build links in EJS

    console.log(`   Made '${determinedLang}' available as res.locals.currentLanguage.`);
    console.log('--- End Language Detection Cycle ---\n');

    // --- STEP 6: Proceed to Next Middleware or Route ---
    next(); // Crucial: pass control to the next handler in the Express chain.
}

module.exports = languageHandler;