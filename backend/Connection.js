const mongoose = require('mongoose');
require('dotenv').config()

const url = 'mongodb+srv://gnanasaisreemandarapu:3fhSdlykTdOObUOg@play2redeem.07micvh.mongodb.net/play2redeem?retryWrites=true&w=majority'
const connection = mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MONGODB CONNECTION ESTABLISHED")
})
module.exports = connection
