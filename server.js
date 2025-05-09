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
    bodyPartialName: 'home'
  });
});

app.get('/gallery', (req, res) => {
    res.render('index',  {
        currentPage: 'gallery',
        title: 'Gallery',
        bodyPartialName: 'gallery'
    });
}); 

app.get('/gallery/new-collection', (req, res) =>    {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Nouvelle collection",
            en: "New collection"
        },
        bodyPartialName: 'new-collection'
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
        bodyPartialName: 'black-collection'
    })
});

app.get('/gallery/mor-talla-collection', (req, res) =>  {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Collection Mor talla",
            en: "Mor talla collection"
        },
        bodyPartialName: 'mor-talla'
    })
});

app.get('/gallery/family', (req, res) =>    {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Collection famille",
            en:'Family Collection'
        },
        bodyPartialName: 'family'
    })
});

app.get('/gallery/special-edition', (req, res) =>   {
    res.render('index', {
        currentPage: 'gallery',
        title: {
            fr: "Hors série",
            en: "Special collection"
        },
        bodyPartialName: 'special-edition'
    })
});

app.get('/exhibitions', (req, res) =>   {
    res.render('index', {
        currentPage: 'exhibitions',
        title: {
            fr: "Expositions",
            en: "Exhibitions"
        },
        bodyPartialName: 'exhibitions'
    })
});

app.get('/about', (req, res) => {
    res.render('index', {
        currentPage: 'about',
        title: {
            fr: "À propos",
            en: 'About'
        },
        bodyPartialName: 'about'
    })
});

app.get('/contact', (req, res) =>   {
    res.render('index', {
        currentPage: 'contact',
        title: {
            fr: 'Contact',
            en: "Contact"
        },
        bodyPartialName: 'contact'
    })
});

app.get('/store', (req, res) => {
    res.render('index', {
        currentPage: 'store',
        title: {
            fr:"Boutique",
            en: "Store"
        },
        bodyPartialName: 'store'
    })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

