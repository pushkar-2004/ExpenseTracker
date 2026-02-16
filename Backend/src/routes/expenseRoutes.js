const express = require('express');
const { getAllExpenditure, updateExpenditure } = require('../controller/expenseController');

const expRouter = express.Router();

expRouter.get('/getAllExpenditure',getAllExpenditure);
expRouter.patch('/updateExpenditure',updateExpenditure);

module.exports = expRouter;