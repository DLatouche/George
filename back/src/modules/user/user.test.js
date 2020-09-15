import User from './user.model';
import UserRepository from './user.repository';
import UserService from './user.service';
import UserController from './user.controller';
import request from 'supertest'
const app = require("../../index");

describe('User model testing', () => {
    let user = null
    beforeAll(() => {
        user = new User({ id: 0, name: "Zwerque", password: "Rien-0707", role: 1 })
    })

    it('user model exist', async () => {
        expect(user instanceof User).toBe(true);
    })
    it('id should be number', async () => {
        expect(typeof user.id).toBe("number");
    })
    it('name should be string', async () => {
        expect(typeof user.name).toBe("string");
    })
    it('password should be string', async () => {
        expect(typeof user.password).toBe("string");
    })
    it('role should be string', async () => {
        expect(typeof user.role).toBe("number");
    })
});

describe("User repository testing", () => {
    let userRepository = null

    beforeEach(() => {
        userRepository = new UserRepository()
    })

    it('user repository exist', async () => {
        expect(userRepository instanceof UserRepository).toBe(true);
    })

    describe('User repository insert', () => {
        it('user repository insert exist', async () => {
            expect(!!userRepository.insert).toBe(true);
        })

        it('insert user return user with new id', async () => {
            let user = new User({ name: "Zwerque", password: "Rien-0707" })
            let newUser = userRepository.insert({ user })
            expect(newUser.id).toBe(1);
        })
    })

    describe('User repository find', () => {
        it('user repository find exist', async () => {
            expect(!!userRepository.find).toBe(true);
        })

        it('user repository find return array', async () => {
            expect(Array.isArray(userRepository.find())).toBe(true);
        })
    })

    describe('User repository findById', () => {
        it('user repository findById exist', async () => {
            expect(!!userRepository.findById).toBe(true);
        })

        it('user repository findById return user', async () => {
            let newUser = userRepository.insert({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
            let userFinded = userRepository.findById({ id: newUser.id })
            expect(userFinded.id).toBe(newUser.id);
        })

        it('user repository findById return null if user is not found', async () => {
            expect(userRepository.findById({ id: 1 })).toBe(null);
        })
    })

    describe('User repository deleteById', () => {
        it('user repository deleteById exist', async () => {
            expect(!!userRepository.deleteById).toBe(true);
        })

        it('user repository deleteById return user', async () => {
            let newUser = userRepository.insert({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
            let userDeleted = userRepository.deleteById({ id: newUser.id })
            expect(userDeleted.id).toBe(newUser.id);
        })

        it('user deleted no exist', async () => {
            let newUser = userRepository.insert({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
            let userDeleted = userRepository.deleteById({ id: newUser.id })
            expect(userRepository.findById({ id: userDeleted.id })).toBe(null);
        })

        it('user repository deleteById return null if user is not found', async () => {
            expect(userRepository.deleteById({ id: 1 })).toBe(null);
        })
    })

    describe('User repository findByName', () => {
        it('user repository findByName exist', async () => {
            expect(!!userRepository.findByName).toBe(true);
        })

        it('user repository findByName return user', async () => {
            let newUser = userRepository.insert({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
            let userFinded = userRepository.findByName({ name: "Zwerque" })
            expect(userFinded.id).toBe(newUser.id);
        })

        it('user repository findByName return null if user is not found', async () => {
            expect(userRepository.findByName({ name: "Zwerque" })).toBe(null);
        })
    })
})

describe('User service testing', () => {
    let userService = null
    beforeAll(() => {
        userService = new UserService()
    })

    it('user service exist', async () => {
        expect(userService instanceof UserService).toBe(true);
    })

    it('Create user return user', async () => {
        let user = new User({ id: 0, name: "Zwerque", password: "Rien-0707" })
        expect(userService.create({ user }) instanceof User).toBe(true)
    })

    it('Create user and check if username already exist', async () => {
        let user = new User({ id: 0, name: "Zwerque", password: "Rien-0707" })
        userService.userRepository.insert({ user })
        expect(() => { userService.create({ user }) }).toThrow('User already exist with this name')
    })
})

describe('User controller testing', () => {
    let userController = null
    beforeAll(() => { userController = new UserController() })
    it('user controller exist', async () => {
        expect(userController instanceof UserController).toBe(true);
    })

    describe('User controller gel all users', () => {
        it('user controller get all users exist', async () => {
            const res = await request(app)
                .get('/users')
            expect(res.statusCode).toEqual(200)
        })
    })
})