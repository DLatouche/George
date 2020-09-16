import request from 'supertest'
import AppController from './app.controller'
import AppService from './app.service'
const app = require("../../index");

describe('App service testing', () => {
    let appService = null
    beforeAll(() => { appService = new AppService() })

    describe('AppService', () => {
        it('appService exist', async () => {
            expect(appService instanceof AppService).toBe(true);
        })
    })
})

describe('App controller testing', () => {
    let appController = null
    beforeAll(() => { appController = new AppController() })

    describe('get /', () => {
        it('get home exist', async () => {
            const res = await request(app)
                .get('/')
            expect(res.statusCode).toEqual(200)
            expect(res.text).toEqual("Home")
        })
    })

})