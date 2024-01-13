const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    username : String,
    question : String,
    password : String,
})

module.exports = mongoose.model('users',Users) 