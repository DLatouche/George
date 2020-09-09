import User from './user.model';

describe('User model testing', () => {
    it('user model exist', async () => {
        let user = new User()
        expect(user instanceof User).toBe(true);
    })
});