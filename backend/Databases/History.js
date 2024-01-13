const mongoose = require('mongoose')

const History = new mongoose.Schema({
    username : String,
    question : String,
    password : String,
})

module.exports = mongoose.model('history',History) 