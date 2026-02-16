const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    amount:{
        type:Number,
        default:0,
    },
    itemList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"itemsTable"
        }
    ]
},{
    timestamps:true
});

const expenseModel = mongoose.model("expenseTable",expenseSchema);

module.exports = expenseModel;