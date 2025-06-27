require('dotenv').config(); // Loads environment variables from .env file

const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const parser = require('accept-language-parser'); // Needed for root redirect logic

const IN_PRODUCTION = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    console.error('FATAL ERROR: SESSION_SECRET is not defined...');
    process.exit(1);
}

// --- Middleware Setup ---
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files first
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: sessionSecret || 'local_dev_fallback_secret',
    resave: false,
    saveUninitialized: true, // True to store session for language preference
    cookie: {
        secure: IN_PRODUCTION,
        httpOnly: true,
        sameSite: 'lax',
    }
}));

// Import your handlers and helpers
const { i18nUiMiddleware } = require('./helpers/i18nUIHelper');
const pathLanguageHandler = require('./middleware/pathLanguageHandler'); // Using the new handler

app.get('/', (req, res) => {
    let langToRedirect = 'en'; // Default language
    if (req.session && req.session.lang && ['en', 'fr'].includes(req.session.lang)) {
        langToRedirect = req.session.lang;
    } else if (req.headers['accept-language']) {
        try {
            const browserPreferences = parser.parse(req.headers['accept-language']);
            for (const pref of browserPreferences) {
                if (['en', 'fr'].includes(pref.code.toLowerCase())) {
                    langToRedirect = pref.code.toLowerCase();
                    break;
                }
            }
        } catch (e) { /* ignore and use default */ }
    }
    // Redirects to "/en/" or "/fr/"
    res.redirect(302, `/${langToRedirect}/`);
});


// --- Language-Prefixed Router ---
const langRouter = express.Router({ mergeParams: true });
app.use('/:lang', langRouter);

// Apply middleware to the router
langRouter.use(pathLanguageHandler); // Sets res.locals.currentLanguage from path
langRouter.use(i18nUiMiddleware);   // Uses currentLanguage to create res.locals.t

// --- Define all your page routes INSIDE langRouter ---

// Handles "/en/" or "/fr/"
langRouter.get('/', (req, res) => {
    res.render('index', {
        title: res.locals.t('home-page-title'),
        heading: res.locals.t('home-page-heading'),
        currentPage: 'home',
        bodyPartialName: 'home',
        pageIdentifier: 'home-page'
    });
});

// Handles "/en/gallery" or "/fr/gallery"
langRouter.get('/gallery', (req, res) => {
    const collectionSlugs = ["new-collection", "black-collection", "mor-talla-collection", "family", "special-edition"];
    const collectionsForView = collectionSlugs.map(slug => ({
        slug: slug,
        title: res.locals.t(`collection_${slug}_title`, { defaultValue: slug }),
        path: `${res.locals.basePathWithLang}/gallery/${slug}`
    }));

    res.render('index', {
        title: res.locals.t('gallery_overview_title'),
        heading: res.locals.t('gallery_overview_heading'),
        currentPage: 'gallery',
        bodyPartialName: 'gallery-overview',
        collections: collectionsForView,
        pageIdentifier: 'gallery-overview-page'
    });
});

// Handles "/en/gallery/new-collection", "/fr/gallery/black-collection", etc.
langRouter.get('/gallery/:collectionName', (req, res, next) => {
    const { collectionName } = req.params;
    const collectionTitle = res.locals.t(`collection_${collectionName}_title`, { defaultValue: null });

    if (collectionTitle === null) {
        console.warn(`Attempted to access non-existent collection: ${collectionName}`);
        return next(); // Pass to 404 handler
    }

    res.render('index', {
        title: collectionTitle,
        heading: res.locals.t(`collection_${collectionName}_heading`, { defaultValue: collectionTitle }),
        currentPage: `gallery-${collectionName}`,
        bodyPartialName: res.locals.t(`collection_${collectionName}_ejsFile`),
        pageIdentifier: res.locals.t(`collection_${collectionName}_page_identifier`),
        description: res.locals.t(`collection_${collectionName}_description`, { defaultValue: '' })
    });
});


langRouter.get('/about', (req, res) => {
    res.render('index', {
        title: res.locals.t('about-page-title'),
        heading: res.locals.t('about-page-heading'),
        currentPage: 'about',
        bodyPartialName: 'about',
        pageIdentifier: 'about-page'
    });
});

langRouter.get('/exhibitions', (req, res) => {
    res.render('index', {
        title: res.locals.t('exhibitions-page.title'),
        heading: res.locals.t('exhibitions-page-heading'),
        currentPage: "exhibitions",
        bodyPartialName: "exhibitions",
        pageIdentifier: "exhibitions-page"
    })
})

langRouter.get('/contact', (req, res) => {
    res.render('index', {
        title: res.locals.t('contact-page-title'),
        heading: res.locals.t('contact-page-heading'),
        currentPage: "contact",
        bodyPartialName: 'contact',
        pageIdentifier: 'contact-page'
    });
});

langRouter.get('/store', (req, res) => {
    res.render('index', {
        title: res.locals.t('store-page-title'),
        heading: res.locals.t('store-page-heading'),
        currentPage: 'store',
        bodyPartialName: 'store',
        pageIdentifier: 'store-page'
    });
});


// Mount the language-specific router.
// This regex (en|fr) ensures only 'en' or 'fr' are matched as :lang.
// Optional: Redirect /en to /en/ and /fr to /fr/ for canonical URLs (good for SEO)
app.get('/:lang', (req, res, next) => {
    // Check if the URL is exactly /en or /fr (no further path segments)
    if (req.originalUrl === `/${req.params.lang}`) {
        const queryString = Object.keys(req.query).length > 0 ? '?' + new URLSearchParams(req.query).toString() : '';
        console.log(`Redirecting from /${req.params.lang} to /${req.params.lang}/${queryString}`);
        return res.redirect(301, `/${req.params.lang}/${queryString}`); // 301 Permanent redirect
    }
    next(); // If it's like /en/foo, let langRouter handle it or eventually 404
});


// Basic 404 handler (should be last after all valid routes)
app.use((req, res, next) => {
    console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
    // You might want to render a proper 404 page with language support too
    res.status(404).send(`Sorry, page not found. Current language: ${res.locals.currentLanguage || 'unknown'}`);
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
    res.status(500).send('Something broke!');
});




const PORT = process.env.PORT || 3000;
// server.js
// ... at the top or near where you define PORT
console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Current PORT: ${process.env.PORT}`);
// ...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

