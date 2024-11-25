const express = require('express');
const Blog = require("../models/blogs");
const router = express.Router();

router.get('/blog', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render('index', {title: "Homepage", blogs: result});
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blog', {title: "Blog", blog: result});
        })
        .catch(err => {
            res.status(404).render('404', {title: "Not Found"});
        })
})

module.exports = router;