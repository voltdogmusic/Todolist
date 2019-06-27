const mongoose = require('mongoose');
//schema isnt being used
const PostSchmea = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Posts', PostSchmea);
