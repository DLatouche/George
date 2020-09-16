const express = require("express");
const app = express();
import userRouter from './modules/user/user.routes'
import appRouter from './modules/app/app.routes'

app.use('/', appRouter)
app.use('/users', userRouter)

module.exports = app;