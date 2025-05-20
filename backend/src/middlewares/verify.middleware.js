import authProvider from "../providers/auth.provider.js";

export class VerifyMiddleware {
    static async validateToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                return res.status(401).json({ message: 'Not log yet' });
            }
            const token = header.split(' ')[1];
            const decoded = await authProvider.decodeToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            next(error);
        }
    }
}