const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
    },
    price:{
        type:Number,
    },
    status:{
        type:String,
        enum:["pending","purchased"],
        required:true
    },
    description:{
        type:String,
    }
},{
    timestamps:true
});

const ItemModel = mongoose.model('itemsTable',itemSchema); // itemstables is the collection name

module.exports = ItemModel;