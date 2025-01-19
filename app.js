const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
// express app
const app = express();
// MongoDB connection string
const dbURI = 'mongodb+srv://JGPau2suaN2CFKgE:fozil2002f@node-tuts.kdrvs.mongodb.net/?retryWrites=true&w=majority&appName=node-tuts';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => app.listen(3000))
   .catch((error) => console.log(error));

// register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public')); // Serve static files
app.use(morgan('dev'));


// Home route
app.get('/', (req, res) => {
    res.redirect('/blogs');

});

// About route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Create a new blog route
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result }); 
    })
    .catch((error) => {
        console.log(error);
    });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
