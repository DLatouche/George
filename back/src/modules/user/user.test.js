import User from './user.model';

describe('User model testing', () => {
    it('user model exist', async () => {
        let user = new User()
        expect(user instanceof User).toBe(true);
    })
    it('id should be number', async () => {
        let user = new User(1)
        expect(typeof user.id).toBe("number");
    })
    it('name should be string', async () => {
        let user = new User(1, "name")
        expect(typeof user.name).toBe("string");
    })
});