const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', authMiddleware, todoController.create);
router.delete('/:id', authMiddleware, todoController.delete);
router.get('/all', authMiddleware, todoController.getAll);


module.exports = router;