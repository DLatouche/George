import UserService from "./user.service"

export default class UserController {
    constructor() {
        this.userService = new UserService()
    }

    getAllUsers = (req, res) => {
        res.send("Ok")
    }
}
