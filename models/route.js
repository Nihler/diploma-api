const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routeSchema = new Schema({
    locations: Array
})

module.exports = mongoose.model('Route', routeSchema);