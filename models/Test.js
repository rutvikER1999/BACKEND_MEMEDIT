const mongoose = require('mongoose');

const testSChema = new mongoose.Schema({
    description:{
        type: String,
        length:500
    }
    
});

module.exports = mongoose.model('Test', testSChema);