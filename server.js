const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // To parse form data
const { title } = require('process');

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
        title: 'gallery',
        bodyPartialName: 'gallery'
    });
}); 

//links to different collection of painting
app.get('/gallery/black-collection', (req, res) =>  {
    res.render('index', {
        currentPage: 'mor talla',
        title: 'Mor talla',
        bodyPartialName: 'mor-talla'
    })
});

app.get('/gallery/mor-talla-collection', (req, res) =>  {
    res.render('index')
});

app.get('/gallery/family', (req, res) =>    {
    res.render('index')
});

app.get('/gallery/special-edition', (req, res) =>   {
    res.render('index')
});

app.get('/exhibitions', (req, res) =>   {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('index')
});

app.get('/contact', (req, res) =>   {
    res.render('index')
});

app.get('/store', (req, res) => {
    res.render('index')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

