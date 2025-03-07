const Router = require('express');
const router = new Router();

const userRouter = require('./employeesRouter');

router.use('/employees', userRouter);

module.exports = router;
