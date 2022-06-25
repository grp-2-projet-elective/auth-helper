import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Roles } from 'models/user.model';

export abstract class AuthMiddlewares {
    public static async verifyAccessToken(req: Request, res: Response, next: NextFunction) {
        if ((req as any).skipMiddlewares) {
            return next();
        }

        const accessToken: string = req.headers['x-access-token'] as string;

        if (!accessToken) {
            return res.status(403).send({ message: 'Auth token not provided' });
        }

        const isVerifiedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

        if (!isVerifiedToken) {
            return res.status(403).send({ message: 'Auth token invalid' });
        }

        return next();
    }


    public static async hasCustomerRole(req: Request, res: Response, next: NextFunction) {
        const accessToken: string = req.headers['x-access-token'] as string;
        const excpectedRole = Roles.CUSTOMER;

        const tokenPayload = await AuthMiddlewares.getTokenPayload(accessToken);

        if (tokenPayload?.role !== excpectedRole) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }

    public static async hasRestaurantOwnerRole(req: Request, res: Response, next: NextFunction) {
        const accessToken: string = req.headers['x-access-token'] as string;
        const excpectedRole = Roles.RESTAURANT_OWNER;

        const tokenPayload = await AuthMiddlewares.getTokenPayload(accessToken);

        if (tokenPayload?.role !== excpectedRole) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }

    public static async hasDeliveryManRole(req: Request, res: Response, next: NextFunction) {
        const accessToken: string = req.headers['x-access-token'] as string;
        const excpectedRole = Roles.DELIVERY_MAN;

        const tokenPayload = await AuthMiddlewares.getTokenPayload(accessToken);

        if (tokenPayload?.role !== excpectedRole) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }

    public static async hasTechnicalDepartmentRole(req: Request, res: Response, next: NextFunction) {
        const accessToken: string = req.headers['x-access-token'] as string;
        const excpectedRole = Roles.TECHNICAL_DEPARTMENT;

        const tokenPayload = await AuthMiddlewares.getTokenPayload(accessToken);

        if (tokenPayload?.role !== excpectedRole) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }

    public static async hasCommercialDepartmentRole(req: Request, res: Response, next: NextFunction) {
        const accessToken: string = req.headers['x-access-token'] as string;
        const excpectedRole = Roles.COMERCIAL_DEPARTMENT;

        const tokenPayload = await AuthMiddlewares.getTokenPayload(accessToken);

        if (tokenPayload?.role !== excpectedRole) {
            return res.status(403).send({ message: 'Invalid role' });
        }

        return next();
    }

    public static async getTokenPayload(accessToken: string): Promise<jwt.JwtPayload> {
        const decodedToken: jwt.Jwt = jwt.decode(accessToken, {
            complete: true,
            json: true
        }) as jwt.Jwt;

        const tokenPayload = decodedToken?.payload as jwt.JwtPayload;
        return tokenPayload;
    }
}