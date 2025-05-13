require('dotenv').config(); // Loads environment variables from .env file

const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // To parse form data

const session = require('express-session'); // If using sessions for language
// const cookieParser = require('cookie-parser'); // If using cookies

const languageHandler = require('./middleware/languageHandler');

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


// Route to render your EJS file
app.get('/', (req, res) => {
  res.render('index', {
    currentPage: 'home',
    title: 'Bachir',
    bodyPartialName: 'home',
    pageIdentifier: 'home-page'
  });
});

app.get('/gallery', (req, res) => {
    const pageTitles = {
        fr: 'Gallerie',
        en: 'Gallery'
    }
    res.render('index',  {
        currentPage: 'gallery',
        bodyPartialName: 'gallery',
        pageIdentifier: 'gallery-page'
    });
}); 

app.get('/gallery/new-collection', (req, res) =>    {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Nouvelle collection",
            en: "New collection"
        },
        bodyPartialName: 'new-collection',
        pageIdentifier: 'new-collection-page'
    })
});

//links to different collection of painting
app.get('/gallery/black-collection', (req, res) =>  {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Collection noire",
            en: "Black collection"
        },
        bodyPartialName: 'black-collection-page',
        pageIdentifier: 'black-collection-page'
    })
});

app.get('/gallery/mor-talla-collection', (req, res) =>  {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Collection Mor talla",
            en: "Mor talla collection"
        },
        bodyPartialName: 'mor-talla-collection',
        pageIdentifier: 'mor-talla-collection-page'

    })
});

app.get('/gallery/family', (req, res) =>    {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Collection famille",
            en:'Family Collection'
        },
        bodyPartialName: 'family-collection',
        pageIdentifier: 'family-collection-page'

    })
});

app.get('/gallery/special-edition', (req, res) =>   {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Hors série",
            en: "Special collection"
        },
        bodyPartialName: 'special-edition',
        pageIdentifier: 'special-edition-page'

    })
});

app.get('/exhibitions', (req, res) =>   {
    res.render('index', {
        currentPage: 'exhibitions',
        title: {
            fr: "Expositions",
            en: "Exhibitions"
        },
        bodyPartialName: 'exhibitions',
        pageIdentifier: 'exhibitions-page'
    })
});

app.get('/about', (req, res) => {
    res.render('index', {
        currentPage: 'about',
        title: {
            fr: "À propos",
            en: 'About'
        },
        bodyPartialName: 'about',
        pageIdentifier: 'about-page'
    })
});

app.get('/contact', (req, res) =>   {
    res.render('index', {
        currentPage: 'contact',
        title: {
            fr: 'Contact',
            en: "Contact"
        },
        bodyPartialName: 'contact',
        pageIdentifier: 'contact-page'
    })
});

app.get('/store', (req, res) => {
    res.render('index', {
        currentPage: 'store',
        title: {
            fr:"Boutique",
            en: "Store"
        },
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

