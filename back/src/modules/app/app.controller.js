export default class AppController {

    constructor() { }

    getHome = (req, res) => {
        res.send("Home")
    }

    login = (req, res) => {
        res.send("Login")
    }
}