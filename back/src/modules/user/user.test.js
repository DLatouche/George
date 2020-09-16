import User from './user.model';
import UserRepository from './user.repository';
import UserService from './user.service';
import UserController from './user.controller';
import request from 'supertest'
import AppService from '../app/app.service';
const app = require("../../index");

describe('User', () => {

    describe('Model', () => {
        let user = null
        beforeAll(() => {
            user = new User({ id: 0, name: "Zwerque", password: "Rien-0707", role: [] })
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
        it('roles should be array', async () => {
            expect(Array.isArray(user.roles)).toBe(true);
        })
    });

    describe("Repository", () => {
        let userRepository = null

        beforeAll(async () => {
            userRepository = new UserRepository()
        })

        beforeEach(async () => {
            await userRepository.clean()
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

        describe('findByNameAndPassword', () => {
            it('if user not found then return null', async () => {
                expect(userRepository.findByNameAndPassword({ name: "Zwerque", password: "Rien-0707" })).toBe(null);
            })

            it('if name and password are correct then return user', async () => {
                let user = new User({ name: "Zwerque", password: "Rien-0707" })
                userRepository.insert({ user })
                expect(userRepository.findByNameAndPassword({ name: "Zwerque", password: "Rien-0707" }) instanceof User).toBe(true);
            })
        })
    })

    describe('Service', () => {
        let userService = null
        beforeAll(() => {
            userService = new UserService()
        })

        beforeEach(async () => {
            await userService.userRepository.clean()
        })

        it('user service exist', async () => {
            expect(userService instanceof UserService).toBe(true);
        })

        describe("Create", () => {

            it('return user', async () => {
                let user = new User({ id: 0, name: "Zwerque", password: "Rien-0707" })
                let newUser = await userService.create({ user })
                expect(newUser instanceof User).toBe(true)
            })

            it("passorwd it's crypted", async () => {
                let password = "Rien-0707"
                let user = new User({ id: 0, name: "Zwerque", password })
                let newUser = await userService.create({ user })
                expect(newUser.password !== password).toBe(true)
            })
            it('Create user without role, add defaull role', async () => {
                let user = await userService.create({ user: new User({ name: "Usertest", password: "Rien-0707" }) })
                expect(user.roles.length > 0).toBe(true)
            })

            it('check if username already exist', async () => {
                let user = new User({ id: 0, name: "Zwerque", password: "Rien-0707" })
                userService.userRepository.insert({ user })
                let error = Error
                try { await userService.create({ user }) }
                catch (e) { error = e }
                await expect(error).toEqual(new Error('User already exist with this name'))
            })
        })

        describe('findByNameAndPassword', () => {
            it('if user not found then return error', async () => {
                let error = Error
                try { await userService.findByNameAndPassword({ name: "Zwerque", password: "Rien-0707" }) }
                catch (e) { error = e }
                await expect(error).toEqual(new Error('User not found'))
            })

            it('if user find then return user', async () => {
                await userService.create({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
                await expect(await userService.findByNameAndPassword({ name: "Zwerque", password: "Rien-0707" }) instanceof User).toEqual(true)
            })
        })
    })

    describe('Controller ', () => {
        let userController = null
        beforeAll(() => { userController = new UserController() })

        beforeEach(async () => {
            await userController.userService.userRepository.clean()
        })

        it('user controller exist', async () => {
            expect(userController instanceof UserController).toBe(true);
        })

        describe('get ► /users', () => {

            it('if no token send 401', async () => {
                const res = await request(app)
                    .get('/users')
                expect(res.statusCode).toEqual(401)
            })

            it('if token send 200', async () => {
                let appService = new AppService()
                let password = "Rien-0707"
                let user = await appService.userService.create({ user: new User({ name: "Zwerque", password }) })
                let data = await appService.login({ name: user.name, password })
                let res = await request(app).get('/users').set('authorization', `Bearer ${data.token}`)
            })
        })
    })
})
