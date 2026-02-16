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

async function updateExpenditure(req,res){
    try {
        //req will contain the info about the item to be added/removed
        const id=req.body._id;
        const itemAmount = req.body.price;
        const updatedAt=new Date(req.body.updatedAt);

        const start = new Date(updatedAt);
        start.setHours(0,0,0,0);

        const end = new Date(updatedAt);
        end.setHours(23,59,59,999); 

        const expObj = await expenseModel.findOne({
            createdAt:{
                $gte:start,
                $lte:end
            }
        });

        if(!expObj){
            console.log("No documents found");
            return createExpenditure(req,res);
        }
        else{
            const result = await expenseModel.updateOne(
                {
                    _id:expObj._id,
                    itemList:{$ne:id}
                },
                {
                    $push:{itemList:id},
                    $inc:{amount:itemAmount} // no race condition
                }
            );
            res.status(201).json({
                success:true,
                msg:"expenditure updated successfully",
                error:{},
                data:result
            });
        }
       
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
        const {_id,price} = req.body;
        const firstExpenditure = new expenseModel({
            amount:price,
            itemList:[_id]
        });
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

module.exports={
    getAllExpenditure,
    updateExpenditure,
}