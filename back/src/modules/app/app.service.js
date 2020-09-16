import User from "../user/user.model";
import UserService from "../user/user.service";
import jwt from 'jsonwebtoken'
require('dotenv').config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

export default class AppService {
    constructor() {
        this.userService = new UserService()
    }

    login = async ({ name, password }) => {
        try {
            let user = await this.userService.findByNameAndPassword({ name, password })
            let accessToken = jwt.sign({ id: user.id, name: user.name }, ACCESS_TOKEN_SECRET)
            return { token: accessToken, userId: user.id, name: user.name, roles: user.roles }
        } catch (errorFindUser) {
            throw errorFindUser
        }
    }
}