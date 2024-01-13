const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    username : {
        unique : true,
        type:String,
    },
    password : String,
})

module.exports = mongoose.model('users',Users) 