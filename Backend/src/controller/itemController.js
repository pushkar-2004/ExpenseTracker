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

async function getItemById(req,res){
    try {
        const id = req.params.id;
        // console.log(id);
        const result = await ItemModel.findById(id);
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

async function createItem(req,res){
    try {
        const item = new ItemModel(req.body);
        await item.save();
        res.status(201).json({
            msg:'item added successfully',
            error:{},
            data:item,
        });
    } catch (error) {
        res.status(500).json({
            msg:'some error occured',
            error:error,
        });
    }
}

async function updateItem(req,res){
    try {
        const id = req.params.id;
        console.log("from server "+id);
        const result = await ItemModel.findByIdAndUpdate(
            id,
            req.body,
            {returnDocument:"after"}
        );
        res.status(200).json({
            data:result,
            err:{},
            success:true
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error,
            data:{}
        });
    }
}

async function deleteItem(req,res){
    try {
        const id = req.params.id;
        const result = await ItemModel.findByIdAndDelete(id);
        res.status(400).json({
            success:true,
            data:result,
            error:{}
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            data:{},
            error:error
        });
    }
}

module.exports = {
    getAllItem,
    createItem,
    updateItem,
    deleteItem,
    getItemById,
};