const expenseModel = require('../model/expenseSchema');

async function getAllExpenditure(req,res){
    try {
        const result = await expenseModel.find().populate("itemList");
        res.status(200).json({
            success:true,
            data:result,
            error:{},
        });
    } catch (error) {
        res.send(500).json({
            success:false,
            data:{},
            error:error
        });
    }
}

async function getExpenditure(req,res){
    try {
        const id = req.params.id;
        const result = await expenseModel.findById(id);
        res.status(200).json({
            success:true,
            data:result,
            error:{},
        });
    } catch (error) {
        res.send(500).json({
            success:false,
            data:{},
            error:error
        });
    }
}

async function updateExpenditure(req,res){
    try {
        const id = req.params.id;
        const result = await expenseModel.findByIdAndUpdate(
            id,
            req.body,
            {returnDocument:"after"}
        );
        res.status(200).json({
            success:true,
            data:result,
            error:{},
            msg:"document updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:"error while updating expenditure",
            data:{},
            error:error,
        });
    }
}

async function createExpenditure(req,res){
    try {
        // const {price} = req.body;
        const firstExpenditure = new expenseModel(req.body);
        const result = await firstExpenditure.save();
        res.status(201).json({
            success:true,
            msg:"expenditure created successfully",
            data:result,
            error:{}
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:"error while creating first expenditure",
            data:{},
            error:error,
        });
    }
}

async function deleteExpenditure(req,res){
    try {
        const id = req.params.id;
        const result = await expenseModel.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            msg:"expenditure deleted successfully",
            data:result,
            error:{}
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:"error in deleting",
            data:{},
            error:error
        });
    }
}

module.exports={
    getAllExpenditure,
    updateExpenditure,
    createExpenditure,
    deleteExpenditure,
    getExpenditure,
}