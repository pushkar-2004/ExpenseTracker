const express = require("express");
const {
  getAllExpenditure,
  updateExpenditure,
  createExpenditure,
  deleteExpenditure,
  getExpenditure,
} = require("../controller/expenseController");

const expRouter = express.Router();

expRouter.get("/getAllExpenditure", getAllExpenditure);
expRouter.get("/getExpenditure/:id",getExpenditure)
expRouter.patch("/updateExpenditure/:id", updateExpenditure);
expRouter.post("/createExpenditure", createExpenditure);
expRouter.delete("/deleteExpenditure/:id", deleteExpenditure);

module.exports = expRouter;
