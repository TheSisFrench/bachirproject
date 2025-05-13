// middleware/languageHandler.js
const parser = require('accept-language-parser');

function languageHandler(req, res, next) {
    const supportedLanguages = ['en', 'fr']; // Add more as you support them
    const siteDefaultLang = 'en';
    let determinedLang = siteDefaultLang;

    console.log('\n--- Language Detection Cycle ---');

    if (req.query.lang && supportedLanguages.includes(req.query.lang.toLowerCase())) {
        determinedLang = req.query.lang.toLowerCase();
        if (req.session) {
            req.session.lang = determinedLang;
            console.log(`1. Language explicitly set to: '${determinedLang}' via query, saved to session.`);
        }
    } else if (req.session && req.session.lang && supportedLanguages.includes(req.session.lang)) {
        determinedLang = req.session.lang;
        console.log(`2. Language loaded from session: '${determinedLang}'.`);
    } else if (req.headers['accept-language']) {
        console.log(`3. Checking 'Accept-Language' header: ${req.headers['accept-language']}`);
        try {
            const browserPreferences = parser.parse(req.headers['accept-language']);
            let foundSupportedBrowserLang = false;
            for (const pref of browserPreferences) {
                const baseLang = pref.code.toLowerCase();
                if (supportedLanguages.includes(baseLang)) {
                    determinedLang = baseLang;
                    foundSupportedBrowserLang = true;
                    console.log(`   Found supported language from browser preferences: '${determinedLang}'.`);
                    if (req.session) {
                        req.session.lang = determinedLang;
                        console.log(`   Stored browser-derived language '${determinedLang}' in session.`);
                    }
                    break;
                }
            }
            if (!foundSupportedBrowserLang) {
                console.log('   No supported language in browser preferences. Using site default.');
                // determinedLang remains siteDefaultLang
            }
        } catch (error) {
            console.error('   Error parsing Accept-Language header:', error);
            // determinedLang remains siteDefaultLang
        }
    } else {
        console.log('4. No query, session, or Accept-Language. Using site default.');
        // determinedLang remains siteDefaultLang
    }

    if (req.session && !req.session.lang && supportedLanguages.includes(determinedLang)) {
        req.session.lang = determinedLang; // Initialize session with determined language if not already set
        console.log(`   Initialized session with language: '${determinedLang}'`);
    }

    res.locals.currentLanguage = determinedLang;
    res.locals.queryParams = { ...req.query }; // For building links

    console.log(`   Final determined language for this request: '${determinedLang}'.`);
    console.log('--- End Language Detection Cycle ---\n');
    next();
}

module.exports = languageHandler;