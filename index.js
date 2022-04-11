const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':false}));

app.get('/',(req,res)=>{
    return res.send(`Hey I'm ready to serve.`)
})

app.listen(3000,()=>{
    console.log("Server started at 3000");
})