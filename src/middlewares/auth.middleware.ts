import { createHmac } from 'crypto';

export abstract class AuthMiddleware {
    public static verifyAccessToken(req, res, next) {
        const accessToken: string = req.headers["x-access-token"] as string;

        if (!accessToken) {
            return res.status(403).send({ message: "Auth token not provided!" });
        }

        const validHashedToken = createHmac('sha256', process.env.TOKEN_SECRET as string).update(process.env.ACCESS_TOKEN as string).digest('hex');
        const hashedToken = createHmac('sha256', process.env.TOKEN_SECRET as string).update(accessToken).digest('hex');

        if (hashedToken !== validHashedToken) {
            return res.status(403).send({ message: "Auth token invalid!" });
        }

        return next();
    }
}