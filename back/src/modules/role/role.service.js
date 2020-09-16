import RoleRepository from "./role.repository";

export default class RoleService {
    constructor() {
        this.roleRepository = new RoleRepository()
    }

    create = ({ role }) => {
        let checkRole = this.roleRepository.findByName({ name: role.name })
        if (checkRole) throw new Error('Role already exist')
        return this.roleRepository.insert({ role })
    }

    findByName = ({ name }) => {
        return this.roleRepository.findByName({ name })
    }
}