import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthProvider {
    async encodeToken(user) {
        try {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
                algorithm: 'HS256'
            });
            return token;
        } catch (error) {
            throw new Error('Error encoding token');
        }
    }
    async decodeToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Error decoding token');
        }
    }
}

export default new AuthProvider();