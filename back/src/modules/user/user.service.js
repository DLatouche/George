import UserRepository from './user.repository';
import RoleService from '../role/role.service';
import { GUEST } from '../role/role.model';
import bcrypt from 'bcrypt';

export default class UserService {

    constructor() {
        this.userRepository = new UserRepository()
        this.rolesService = new RoleService()
    }

    create = async ({ user }) => {
        let checkUser = this.userRepository.findByName({ name: user.name })
        if (checkUser) throw new Error('User already exist with this name')
        if (user.roles.length == 0) {
            let defaultRole = await this.rolesService.findByName({ name: GUEST })
            user.roles.push(defaultRole)
        }
        try {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(user.password, salt)
            user.password = hashedPassword
            return this.userRepository.insert({ user })
        } catch (e) {
            console.log("user.service.js -> 26: e", e)
            throw e
        }
    }

    findByNameAndPassword = async ({ name, password }) => {
        const errorUserNotFound = "User not found"
        let user = await this.userRepository.findByName({ name })
        if (!user) throw new Error(errorUserNotFound)
        try {
            if (await bcrypt.compare(password, user.password)) return user
            else throw new Error(errorUserNotFound)
        } catch (e) {
            throw e
        }
    }

}