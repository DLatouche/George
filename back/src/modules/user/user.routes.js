import express from 'express'
import UserController from './user.controller'
import { authenticateToken } from '../../middleware'
const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/', authenticateToken, userController.getAllUsers)

module.exports = userRouter;