const express = require("express");
const app = express();
import userRouter from './modules/user/user.routes'

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.use('/users', userRouter)

module.exports = app;