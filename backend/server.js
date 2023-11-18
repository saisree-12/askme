const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./connection')
const db_users = require('./Databases/Users')

require('dotenv').config()


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup',async  (req,res) => {
    await db_users.insertMany({
        username : req.body.username,
        password : req.body.password,

    }).then((response) => {
        console.log(response);
        res.send({flag:true});
    })
    .catch((error) => {
        console.log(error);
        res.send({flag:false});
    })
})


app.post('/login',async (req,res) => {
    const uname = req.body.username;
    const pwd = req.body.password;
    await db_users.find({username:uname,password:pwd})
    .then(response => {
        if(response.length>0 && response.length===1) res.send({flag:true})
        else res.send({flag:false})
    })
    .catch(() => {
        res.send({flag:false})
    })
})

app.listen(5000,() => {
    console.log('Server started on port 5000');
}) 