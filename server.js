const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // To parse form data

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Route to render your EJS file
app.get('/', (req, res) => {
  res.render('index', {
    currentPage: 'home',
    title: 'home',
    bodyPartialName: 'home',
    pageIdentifier: 'home-page'
  });
});

app.get('/gallery', (req, res) => {
    res.render('index',  {
        currentPage: 'gallery',
        title: 'Gallery',
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
})

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

