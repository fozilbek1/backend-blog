const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// express app
const app = express();
// MongoDB connection string
const dbURI = 'mongodb+srv://JGPau2suaN2CFKgE:fozil2002f@node-tuts.kdrvs.mongodb.net/?retryWrites=true&w=majority&appName=node-tuts';

mongoose.connect(dbURI)
   .then((result) => app.listen(3000))
   .catch((error) => console.log(error));

// register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public')); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies    
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

app.use(blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
