import UserRepository from './user.repository';
import RoleService from '../role/role.service';
import { GUEST } from '../role/role.model';

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
        return this.userRepository.insert({ user })
    }

}