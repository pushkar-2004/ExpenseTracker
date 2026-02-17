const express = require("express");
const {
  getAllExpenditure,
  updateExpenditure,
  createExpenditure,
  deleteExpenditure,
} = require("../controller/expenseController");

const expRouter = express.Router();

expRouter.get("/getAllExpenditure", getAllExpenditure);
expRouter.patch("/updateExpenditure/:id", updateExpenditure);
expRouter.post("/createExpenditure", createExpenditure);
expRouter.delete("/deleteExpenditure/:id", deleteExpenditure);

module.exports = expRouter;
