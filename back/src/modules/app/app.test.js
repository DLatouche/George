import request from 'supertest'
import AppController from './app.controller'
import AppService from './app.service'
import User from '../user/user.model';
const app = require("../../index");
describe("App", () => {

    describe('Service', () => {
        let appService = null

        beforeAll(async () => {
            appService = new AppService()
        })

        beforeEach(async () => {
            await appService.userService.userRepository.clean()
        })

        describe('Login', () => {
            it('if no send name and password then error', async () => {
                let error = Error
                try { await appService.login() }
                catch (e) { error = e }
                await expect(error instanceof TypeError).toBe(true)
            })
            it('return data with token', async () => {
                await appService.userService.create({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
                let data = await appService.login({ name: "Zwerque", password: "Rien-0707" })
                expect(!!data.token).toBe(true);
            })
            it('return data with name', async () => {
                await appService.userService.create({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
                let data = await appService.login({ name: "Zwerque", password: "Rien-0707" })
                expect(!!data.name).toBe(true);
            })
            it('return data with userId', async () => {
                await appService.userService.create({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
                let data = await appService.login({ name: "Zwerque", password: "Rien-0707" })
                expect(!!data.userId).toBe(true);
            })
            it('return data with roles', async () => {
                await appService.userService.create({ user: new User({ name: "Zwerque", password: "Rien-0707" }) })
                let data = await appService.login({ name: "Zwerque", password: "Rien-0707" })
                expect(data.roles.length > 0).toBe(true);
            })
            it('if user not found then error', async () => {
                let error = Error
                try { await appService.login({ name: "Zwerque", password: "Rien-0707" }) }
                catch (e) { error = e }
                await expect(error).toEqual(new Error('User not found'))
            })

        })
    })

    describe('Controller', () => {
        describe('get ► /', () => {
            it('get home exist', async () => {
                const res = await request(app)
                    .get('/')
                expect(res.statusCode).toEqual(200)
                expect(res.text).toEqual("Home")
            })
        })

        describe('Post ► /login', () => {
            it('Login exist', async () => {
                const res = await request(app)
                    .post('/login')
                expect(res.statusCode).toEqual(200)
                expect(res.text).toEqual("Login")
            })
        })

    })
})
