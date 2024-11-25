const express = require('express');
const morgan = require('morgan');
const mongos = require('mongoose')
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
const dbURL = 'mongodb+srv://aminabbasli021:OwIG2Ss76qqL0UaJ@nodeblog.txjuq.mongodb.net/?retryWrites=true&w=majority&appName=NodeBlog'

mongos.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('connected');
        app.listen(3000)
    })
    .catch(err => {
        console.log(err);
    })
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use('/blog',blogRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.redirect('/blog');
})
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

app.get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
})

app.use((req, res) => {
    res.status(404).render('404', {title: 'Not Found'});
})