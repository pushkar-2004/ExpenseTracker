const expenseModel = require("../model/expenseSchema");

async function getAllExpenditure(req, res) {
  try {
    //const limit = 5;
    const { lastDate, month, year, page = 1, limit = 5 } = req.query;
    console.log(lastDate);
    const pageNumber = Number(page);
    const pageLimit = Number(limit);
    let filter = {};
    const selectedDate = new Date(lastDate);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }
    else if (lastDate) {
      const selectedDate = new Date(lastDate);

      if (isNaN(selectedDate)) {
        return res.status(400).json({
          success: false,
          error: "Invalid date",
        });
      }

      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filter.date = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    // 3. Calculate skip
    const skip = (pageNumber - 1) * pageLimit;

    // 4. Fetch paginated data
    const result = await expenseModel
      .find(filter)
      .skip(skip)
      .limit(pageLimit)
      .sort({ date: -1 }); // latest first (optional but recommended)

    // 5. Total count (important for frontend)
    const total = await expenseModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: result,
      pagination: {
        total,
        page: pageNumber,
        limit: pageLimit,
        totalPages: Math.ceil(total / pageLimit),
      },
      error: {},
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      data: {},
      error: error,
    });
  }
}

async function getExpenditure(req, res) {
  try {
    const id = req.params.id;
    const result = await expenseModel.findById(id);
    res.status(200).json({
      success: true,
      data: result,
      error: {},
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      data: {},
      error: error,
    });
  }
}

async function updateExpenditure(req, res) {
  try {
    if (req.body.amount === 0 || req.body.itemList.length === 0) {
      res.status(400).json({
        success: false,
        msg: "Amount must be greater than 0 and itemList cannot be empty",
        data: {},
        error: {},
      });
    }
    const id = req.params.id;
    const result = await expenseModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json({
      success: true,
      data: result,
      error: {},
      msg: "document updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "error while updating expenditure",
      data: {},
      error: error,
    });
  }
}

async function createExpenditure(req, res) {
  try {
    console.log("in create expenditure");
    console.log(req.body);
    const { amount, itemList } = req.body;
    if (amount === 0 || itemList.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "Amount must be greater than 0 and itemList cannot be empty",
        data: {},
        error: {},
      });
    }
    // console.log(req.body)

    const firstExpenditure = new expenseModel(req.body);
    const result = await firstExpenditure.save();
    res.status(201).json({
      success: true,
      msg: "expenditure created successfully",
      data: result,
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "error while creating first expenditure",
      data: {},
      error: error,
    });
  }
}

async function deleteExpenditure(req, res) {
  try {
    const id = req.params.id;
    const result = await expenseModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      msg: "expenditure deleted successfully",
      data: result,
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "error in deleting",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  getAllExpenditure,
  updateExpenditure,
  createExpenditure,
  deleteExpenditure,
  getExpenditure,
};
