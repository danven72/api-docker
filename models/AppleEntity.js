const { number } = require('joi');
const mongoose = require('mongoose');

const AppleSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    color: {
        type: String,
        required: true
    },
   date: {
       type: Date,
       default: Date.now
    }
});

module.exports = mongoose.model('Apples', AppleSchema);