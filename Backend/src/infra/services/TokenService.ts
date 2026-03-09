import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export class TokenService {
    private readonly accessSecret = process.env.JWT_ACCESS_SECRET || 'access_secret';
    private readonly refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

    generateTokens(payload: { userId: string; username: string }) {
        const accessToken = jwt.sign(payload, this.accessSecret, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, this.refreshSecret, { expiresIn: '7d' });
        
        return { accessToken, refreshToken };
    }

    verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, this.accessSecret);
        } catch (e) { return null; }
    }

    verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, this.refreshSecret);
        } catch (e) { return null; }
    }
}