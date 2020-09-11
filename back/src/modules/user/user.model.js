export default class User {

    constructor(user) {
        const { id, name, password, role } = user
        this.id = id
        this.name = name
        this.password = password
        this.role = role
    }
}
