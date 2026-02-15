const express = require('express');
const DB_Connect = require('./utils/db');
const router = require('./routes/itemRoutes');

require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT;

app.use('/api',router);

app.listen(PORT,()=>{
    DB_Connect();
    console.log(`server running on port ${PORT}`);
});