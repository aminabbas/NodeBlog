const express = require('express');
const morgan = require('morgan');
const mongos = require('mongoose')
const Blog = require('./models/blogs');
const blog = require("./models/blogs");

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

app.get('/admin', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render('admin', {title: 'Admin Admin', blogs: result});
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/admin/add', (req, res) => {
    res.render('add', {title: 'Add New Blog'});
})

app.post('/admin/add', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        })
})

app.delete('/admin/delete/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({link: '/admin'})
        })
        .catch(err => {
            console.log(err);
        })
})

app.delete('/admin/delete/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({link: '/admin'})
        })
        .catch(err => {
            console.log(err);
        })
})


app.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render('index', {title: "Homepage", blogs: result});
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blog', {title: "Blog", blog: result});
        })
        .catch(err => {
            res.status(404).render('404', {title: "Not Found"});
        })
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