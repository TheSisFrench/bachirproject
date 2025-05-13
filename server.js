require('dotenv').config(); // Loads environment variables from .env file

const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // To parse form data

const session = require('express-session'); // If using sessions for language
// const cookieParser = require('cookie-parser'); // If using cookies

const IN_PRODUCTION = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    console.error('FATAL ERROR: SESSION_SECRET is not defined in the environment.');
    console.error('For development, you can set it in a .env file.');
    console.error('For production, set it in your deployment environment variables.');
    process.exit(1); // Exit if the secret isn't set, as it's critical
}


// --- Middleware Setup ---
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');   // Set EJS as the view engine

app.use(session({
    secret: sessionSecret, // Use the variable here
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: IN_PRODUCTION,
        httpOnly: true,
        sameSite: 'lax',
    }
}));

// Session middleware - MUST be before languageHandler if it uses session
app.use(session({
    secret: sessionSecret || 'local_dev_fallback_secret', // Fallback only for dev if .env fails
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: IN_PRODUCTION,
        httpOnly: true,
        sameSite: 'lax',
    }
}));

const languageHandler = require('./middleware/languageHandler');
const { getLocalizedText } = require('./helpers/i18nHelper'); // Adjust path if needed

// Custom Language Middleware
app.use(languageHandler); // Now res.locals.currentLanguage and res.locals.queryParams are set


// Route to render your EJS file
app.get('/', (req, res) => {
    const pageContent =  {
        fr: {
            title: 'Bachir',
            heading: 'Bachir',
        },
        en: {
            title: 'Bachir',
            heading: 'Bachir',
        }
    }
     // getLocalizedText will return either pageContent.en or pageContent.fr
     const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);

    res.render('index', {
        title: i18n.title,
        heading: 'Bachir',
        currentPage: 'home',
        bodyPartialName: 'home',
        pageIdentifier: 'home-page'
    });
});

app.get('/gallery', (req, res) => {
    const pageContent = {
        fr: {
            title: 'Gallerie',
            heading: 'Gallerie',
        },
        en: {
            title: 'Gallery',
            heading: 'Gallery',
        }
    };

    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);

    res.render('index',  {
        title: i18n.title,
        heading: 'Gallery',
        currentPage: 'gallery',
        bodyPartialName: 'gallery',
        pageIdentifier: 'gallery-page'
    });
}); 

app.get('/gallery/new-collection', (req, res) =>    {
    
    const pageContent = {
        fr: {
            title: "Nouvelle collection",
            heading: 'Nouvelle collection',
        },
        en: {
            title: "New collection",
            heading: 'New collection',
        }
    };

    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        title: i18n.title,
        currentPage: 'new-collection',
        heading: 'New collection',
        bodyPartialName: 'new-collection',
        pageIdentifier: 'new-collection-page'
    })
});

//links to different collection of painting
app.get('/gallery/black-collection', (req, res) =>  {
    const pageContent =     {
        fr: {
            title: 'Collection noire',
            heading: 'Collection noire',
        },
        en: {
            title: 'Black collection',
            heading: 'Black collection'
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        currentPage: 'gallery',
        title: i18n.title,
        heading: 'New collection',
        bodyPartialName: 'black-collection-page',
        pageIdentifier: 'black-collection-page'
    })
});

app.get('/gallery/mor-talla-collection', (req, res) =>  {
    const pageContent =     {
        fr: {
            title: 'Collection Mor talla',
            heading: 'Collection Mor talla',
        },
        en: {
            title: 'Mor talla collection',
            heading: 'Mor talla collection'
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        currentPage: 'gallery',
        title: i18n.title,
        heading: 'New collection',
        bodyPartialName: 'mor-talla-collection',
        pageIdentifier: 'mor-talla-collection-page'
    });
});

app.get('/gallery/family', (req, res) =>    {
    const pageContent =     {
        fr: {
            title: 'Collection famille',
            heading: 'Collection famille',
        },
        en: {
            title: 'Family collection',
            heading: 'Family collection',
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        currentPage: 'gallery',
        title: i18n.title,
        heading: 'New collection',
        bodyPartialName: 'family-collection',
        pageIdentifier: 'family-collection-page'

    })
});

app.get('/gallery/special-edition', (req, res) =>   {
    const pageContent =     {
        fr: {
            title: 'Édition spéciale',
            heading: 'Édition spéciale',

        },
        en: {
            title: 'Special edition',
            heading: 'Special edition',
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        currentPage: 'gallery',
        title: i18n.title,
        heading: 'New collection',
        bodyPartialName: 'special-edition',
        pageIdentifier: 'special-edition-page'

    })
});

app.get('/exhibitions', (req, res) =>   {
    const pageContent = {
        fr: {
            title: 'Expositions',
            heading: 'Expositions',
        },
        en: {
            title: 'Exhibitions',
            heading: 'Exhibitions',
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        title: i18n.title,
        currentPage: 'exhibitions',
        bodyPartialName: 'exhibitions',
        pageIdentifier: 'exhibitions-page'
    })
});

app.get('/about', (req, res) => {
    const pageContent =     {
        fr: {
            title: 'À propos',
            heading: 'À propos',
        },
        en: {
            title: 'About',
            heading: 'About'
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        title: i18n.title,
        currentPage: 'about',
        bodyPartialName: 'about',
        pageIdentifier: 'about-page'
    })
});

app.get('/contact', (req, res) =>   {
    const pageContent =     {
        fr: {
            title: 'Contact',
            heading: 'Contact',
        },
        en: {
            title: 'Contact',
            heading: 'Contact'
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        currentPage: 'contact',
        title: i18n.title,
        bodyPartialName: 'contact',
        pageIdentifier: 'contact-page'
    })
});

app.get('/store', (req, res) => {
    const pageContent =     {
        fr: {
            title: 'Boutique',
            heading: 'Boutique',
        },
        en: {
            title: 'Boutique',
            heading: 'Boutique'
        }
    };
    const i18n = getLocalizedText(pageContent, res.locals.currentLanguage);
    res.render('index', {
        currentPage: 'store',
        title: i18n.title,
        bodyPartialName: 'store',
        pageIdentifier: 'store-page'
    })
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

