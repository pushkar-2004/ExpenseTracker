const express = require('express');
const { createItem, getAllItem, updateItem, deleteItem, getItemById } = require('../controller/itemController');

const itemRouter = express.Router();

itemRouter.post('/createItem',createItem);
itemRouter.get('/getItem',getAllItem);
itemRouter.get('/getItemById/:id',getItemById);
itemRouter.patch('/updateItem/:id',updateItem);
itemRouter.delete('/deleteItem/:id',deleteItem)

module.exports = itemRouter;