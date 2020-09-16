export default class User {

    constructor(user) {
        const { id, name, password, roles } = user
        this.id = id
        this.name = name
        this.password = password
        if(roles) this.roles = roles
        else this.roles = []
    }
}
