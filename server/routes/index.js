const Routes= require('express')
const routes = new Routes()
const userRouter = require('./userRouter')

routes.use('/user', userRouter)

module.exports = routes;