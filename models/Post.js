const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        default: 'no-image.jpg'
    },
    description:{
        type: String,
        length:500
    },
    link: {
        type: String,
        required: true
    },
    createdAT : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);