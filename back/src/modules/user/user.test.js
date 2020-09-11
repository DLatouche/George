import User from './user.model';

describe('User model testing', () => {
    let user = null
    beforeEach(() => {
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