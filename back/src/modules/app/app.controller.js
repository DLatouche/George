export default class AppController {

    constructor() { }

    getHome = (req, res) => {
        res.send("Home")
    }
}