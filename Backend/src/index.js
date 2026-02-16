const express = require('express');
const DB_Connect = require('./utils/db');
const itemRouter = require('./routes/itemRoutes');
const cors = require('cors');
const expRouter = require('./routes/expenseRoutes');

require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const PORT = process.env.PORT;

app.use('/api',itemRouter);
app.use('/api/exp',expRouter)

app.listen(PORT,()=>{
    DB_Connect();
    console.log(`server running on port ${PORT}`);
});