const ItemModel = require("../model/ItemSchema");


async function getAllItem(req,res){
    try {
        const result = await ItemModel.find();
        res.status(200).json({
            msg:'fetched all items',
            err:{},
            data:result
        });
    } catch (error) {
        res.status(500).json({
            msg:'error in getAllItem',
            error:error,
            data:{}
        });
    }
}

async function addItem(req,res){
    try {
        // const itemName = req.body.itemName;
        // const quantity = req.body.quantity;
        // const description = req.body.description;
        const item = new ItemModel(req.body);
        await item.save();
        res.status(201).json({
            msg:'item added successfully',
            error:{},
        });
    } catch (error) {
        res.status(500).json({
            msg:'some error occured',
            error:error,
        });
    }
}

module.exports = {
    getAllItem,
    addItem,
};