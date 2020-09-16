import { Role, ADMIN } from './role.model'
import RoleRepository from './role.repository'
import RoleService from './role.service'

describe('role model testing', () => {
    let role = null
    beforeAll(() => {
        role = new Role({ name: "Admin" })
    })

    it('role should be string', async () => {
        expect(typeof role.name).toBe("string");
    })
});

describe("role repository testing", () => {
    let roleRepository = null

    beforeEach(() => {
        roleRepository = new RoleRepository()
    })

    describe('role repository insert', () => {
        it('role repository insert exist', async () => {
            expect(!!roleRepository.insert).toBe(true);
        })

        it('insert role return new role', async () => {
            let role = new Role({ name: "Admin" })
            let newRole = roleRepository.insert({ role })
            expect(newRole instanceof Role).toBe(true);
        })
    })

    describe('role repository find', () => {
        it('role repository find exist', async () => {
            expect(!!roleRepository.find).toBe(true);
        })

        it('role repository find return array', async () => {
            expect(Array.isArray(roleRepository.find())).toBe(true);
        })
    })

    describe('role repository findByName', () => {
        it('role repository findByName exist', async () => {
            expect(!!roleRepository.findByName).toBe(true);
        })

        it('role repository findByName return role', async () => {
            let role = new Role({ name: "Admin" })
            roleRepository.insert({ role })
            expect(roleRepository.findByName({ name: 'Admin' }) instanceof Role).toBe(true);
        })
    })
})

describe('role service testing', () => {
    let roleService = null
    beforeAll(() => {
        roleService = new RoleService()
    })

    it('Create role return role', async () => {
        let role = new Role({ name: "Admin" })
        expect(roleService.create({ role }) instanceof Role).toBe(true)
    })

    it('Create role and check if rolename already exist', async () => {
        let role = new Role({ name: "Admin", })
        roleService.roleRepository.insert({ role })
        expect(() => { roleService.create({ role }) }).toThrow('Role already exist')
    })

    it('findByName return role', async () => {
        expect(roleService.findByName({ name: ADMIN }) instanceof Role).toBe(true)
    })

})