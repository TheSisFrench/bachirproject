const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Route to render your EJS file
app.get('/', (req, res) => {
  res.render('home')
});

app.get('/gallery', (req, res) => {
    res.render('gallery')
}); 

//links to different collection of painting
app.get('/black-collection', (req, res) =>  {
    res.render('gallery/black-collection')
});

app.get('/mor-talla-collection', (req, res) =>  {
    res.render('gallery/mor-talla')
});

app.get('/family', (req, res) =>    {
    res.render('gallery/family')
});

app.get('/special-edition', (req, res) =>   {
    res.render('gallery/special-edition')
});

app.get('/exhibitions', (req, res) =>   {
    res.render('gallery/exhibitions')
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/store', (req, res) => {
    res.render('store')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

