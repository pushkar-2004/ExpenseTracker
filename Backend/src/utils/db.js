const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI

async function DB_Connect(){
    try {
        // console.log(typeof(MONGO_URI))
        const conn = await mongoose.connect(MONGO_URI);
        console.log('connected to db')
        return conn;
    } catch (error) {
        console.log(`Error connecting to db ${error}`);
    }
}

module.exports = DB_Connect;
