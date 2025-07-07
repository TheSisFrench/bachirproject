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
app.get('/favicon.ico', (req, res) => res.status(204).end());

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
const contentHandler = require('./middleware/galleryCollectionsHandler');

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
langRouter.use(contentHandler);

// --- Define all your page routes INSIDE langRouter ---

// Handles "/en/" or "/fr/"
langRouter.get('/', (req, res) => {
    res.render('index', {
        title: res.locals.t('home_page_title'),
        heading: res.locals.t('home_page_heading'),
        currentPage: 'home',
        bodyPartialName: 'home',
        pageIdentifier: 'home-page'
    });
});

// Handles "/en/gallery" or "/fr/gallery"
langRouter.get('/gallery', (req, res) => {

    res.render('index', {
        title: res.locals.t('gallery_overview_title'),
        heading: res.locals.t('gallery_overview_heading'),
        currentPage: 'gallery',
        bodyPartialName: 'gallery',
        pageIdentifier: 'gallery-overview-page'
    });
});

langRouter.get('/gallery/:collectionName', (req, res, next) => {
    const { collectionName } = req.params;

    // Find the collection in the pre-prepared navigation data
    const collection = res.locals.navigation.collections.find(c => c.slug === collectionName);

    if (!collection) {
        console.warn(`Collection not found in prepared data: ${collectionName}`);
        return next(); // Pass to 404 handler
    }

    res.render('index', {
        title: collection.titleKey, // Use the pre-translated title
        heading: collection.titleKey,
        currentPage: `gallery-${collectionName}`,
        // Get the EJS file name from the t() function as before, or add it to galleryCollections.js data
        bodyPartialName: res.locals.t(`collection_${collectionName}`),
        pageIdentifier: `${collectionName}-page`,
        // Pass the entire collection object (which includes paintings) to the template
        collection: collection
    });
});

langRouter.get('/painting-overview/:paintingId', (req, res, next) =>  {
    const { paintingId } = req.params;
    let foundPainting = null;

    // Search through all collections to find the painting
    if (res.locals.navigation && res.locals.navigation.collections) {
        for (const collection of res.locals.navigation.collections) {
            foundPainting = collection.paintings.find(p => p.id === paintingId);
            if (foundPainting) break;
        }
    }

    if (!foundPainting) {
        console.warn(`Painting with id '${paintingId}' not found.`);
        return next(); // 404
    }

    res.render('index', {
        title: foundPainting.title,
        heading: foundPainting.heading,
        currentPage: 'view-painting',
        bodyPartialName: 'view-painting',
        painting: foundPainting,
        pageIdentifier: `painting-${paintingId}`
    })
})


langRouter.get('/about', (req, res) => {
    res.render('index', {
        title: res.locals.t('about_page_title'),
        heading: res.locals.t('about_page_heading'),
        currentPage: 'about',
        bodyPartialName: 'about',
        pageIdentifier: 'about-page'
    });
});

langRouter.get('/exhibitions', (req, res) => {
    res.render('index', {
        title: res.locals.t('exhibitions_page_title'),
        heading: res.locals.t('exhibitions_page_heading'),
        currentPage: "exhibitions",
        bodyPartialName: "exhibitions",
        pageIdentifier: "exhibitions-page"
    })
})

langRouter.get('/contact', (req, res) => {
    res.render('index', {
        title: res.locals.t('contact_page_title'),
        heading: res.locals.t('contact_page_heading'),
        currentPage: "contact",
        bodyPartialName: 'contact',
        pageIdentifier: 'contact-page'
    });
});

langRouter.get('/store', (req, res) => {
    res.render('index', {
        title: res.locals.t('store_page_title'),
        heading: res.locals.t('store_page_heading'),
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

