import express from 'express'
import UserController from './user.controller'
const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/', userController.getAllUsers)
userRouter.post('/login', userController.login)

module.exports = userRouter;