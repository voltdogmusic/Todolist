const mongoose = require('mongoose');

const CrudSchmea = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Crud', CrudSchmea);
