const mongoose = require('mongoose');

const todoUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    todos:{
        type: Array,
        required : false
    }
});

module.exports = mongoose.model('todoUser', todoUserSchema);
