import { ADMIN, MANAGER, GUEST, Role } from "./role.model"

export default class RoleRepository {
    constructor() {
        this.roles = [new Role({ name: ADMIN }), new Role({ name: MANAGER }), new Role({ name: GUEST })]
    }

    insert = ({ role }) => {
        this.roles.push(role)
        return role
    }

    find = () => {
        return this.roles
    }

    findByName = ({ name }) => {
        let index = 0
        while (index < this.roles.length) {
            if (this.roles[index].name === name) {
                return this.roles[index]
            }
            index++
        }
        return null
    }

}