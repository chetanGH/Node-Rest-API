require('./api/model/db');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const routes = require('./api/routes/router');
app.use(bodyParser.json())
app.use('/api',routes);
app.listen(process.env.PORT,()=>{
    console.clear();
    console.log(`server started ${process.env.PORT}` )
})