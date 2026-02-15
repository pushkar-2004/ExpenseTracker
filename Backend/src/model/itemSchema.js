const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
    },
    description:{
        type:String,
    }
});

const ItemModel = mongoose.model('itemsTable',itemSchema);

module.exports = ItemModel;