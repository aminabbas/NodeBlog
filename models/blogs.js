const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    }
}, {timestamps: true});

const blog = mongoose.model('blogs', blogSchema);
module.exports = blog;