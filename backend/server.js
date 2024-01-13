const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./connection')
const db_users = require('./Databases/Users')
const History = require('./Databases/History')
const fileUpload = require('./Fileupload')
const { queryPineconeAndQueryGPT } = require('./llm/queryPineconeAndQueryGPT.js')
const { PineconeClient } = require("@pinecone-database/pinecone");

require('dotenv').config()

const app = express();

const client = new PineconeClient();
client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
let indexName = "index01";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',fileUpload)

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

app.post('/askme',(req,res) => {
    const question = req.body.question;
    console.log(question);
    let result = queryPineconeAndQueryGPT(client,indexName,question);
    res.status(200).send({answer:result});
})

app.post('/gethistory',async (req,res) => {
    console.log(req.body.username);
    await History.find({username:req.body.username})
    .then(response => {
        console.log(response);
        res.status(200).send({flag:true,data:response})
    })
    .catch(() => {
        res.status(200).send({flag:false})
    })
})


app.listen(5000,() => {
    console.log('Server started on port 5000');
}) 