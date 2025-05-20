import bcrypt from 'bcryptjs';

class HashProvider {
    async generateHash(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async compareHash(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default new HashProvider();