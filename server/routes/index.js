const express = require('express');
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

module.exports = router;