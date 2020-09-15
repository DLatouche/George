export default class RoleRepository {
    constructor() {
        this.roles = []
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