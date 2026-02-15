const express = require('express');
const { createItem, getAllItem, updateItem, deleteItem } = require('../controller/itemController');

const router = express.Router();

router.post('/createItem',createItem);
router.get('/getItem',getAllItem);
router.patch('/updateItem/:id',updateItem);
router.delete('/deleteItem/:id',deleteItem)

module.exports = router;