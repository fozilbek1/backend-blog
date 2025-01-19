const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// Middleware & static files
app.use(express.static('public')); // Serve static files


app.use(morgan('dev'));

// Home route
app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yagr finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Fozil finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat Yagr', snippet: 'Lorem ipsum dolor sit amet consectetur' }
    ];
    res.render('index', { title: 'Home', blogs: blogs}); // Pass `title` and `blogs` to the view
});

// About route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Create a new blog route
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
