const mongoose = require('mongoose');
require('dotenv').config()

const url = 'mongodb+srv://mandarapu:JDRXfEK5y950aGX4@external.5fpdgd8.mongodb.net/external?retryWrites=true&w=majority'
const connection = mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MONGODB CONNECTION ESTABLISHED")
})
module.exports = connection
