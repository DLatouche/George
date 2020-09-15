import UserRepository from './user.repository';

export default class UserService {

    constructor() {
        this.userRepository = new UserRepository
    }

    create = ({ user }) => {
        let checkUser = this.userRepository.findByName({ name: user.name })
        if(checkUser) throw new Error('User already exist with this name')
        return this.userRepository.insert({ user })
    }

}