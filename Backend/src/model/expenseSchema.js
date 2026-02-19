const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    amount:{
        type:Number,
        default:0,
    },
    itemList:[
        {
            item:{
                type:String,
                required:true
            },
            amt:{
                type:Number
            }
        }
    ],
    date: Date
},{
    timestamps:true
});

const expenseModel = mongoose.model("expenseTable",expenseSchema);

module.exports = expenseModel;