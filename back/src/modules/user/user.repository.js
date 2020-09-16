
export default class UserRepository {
    constructor() {
        if (!!UserRepository.instance) {
            return UserRepository.instance;
        }
        UserRepository.instance = this;
        this.users = [];
        this.id = 0

        return this
    }

    insert = ({ user }) => {
        this.id++
        user.id = this.id
        this.users.push(user)
        return user
    }

    find = () => {
        return this.users
    }

    findById = ({ id }) => {
        let index = 0
        while (index < this.users.length) {
            if (this.users[index].id === id) {
                return this.users[index]
            }
            index++
        }
        return null
    }

    findByName = ({ name }) => {
        let index = 0
        while (index < this.users.length) {
            if (this.users[index].name === name) {
                return this.users[index]
            }
            index++
        }
        return null
    }

    findByNameAndPassword = ({ name, password }) => {
        let index = 0
        while (index < this.users.length) {
            if (this.users[index].name === name && this.users[index].password === password) {
                return this.users[index]
            }
            index++
        }
        return null
    }

    deleteById = ({ id }) => {
        let index = 0
        while (index < this.users.length) {
            if (this.users[index].id === id) {
                return this.users.splice(index, 1)[0]
            }
            index++
        }
        return null
    }

    clean = () => {
        this.users = []
        this.id = 0
    }
}

