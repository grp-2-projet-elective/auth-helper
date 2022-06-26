import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Roles } from '../models/auth.model';

export abstract class AuthMiddlewares {
  public static verifyAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).skipMiddlewares) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;

    if (!accessToken) {
      return res.status(403).send({ message: 'Auth token not provided' });
    }

    const isVerifiedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    if (!isVerifiedToken) {
      return res.status(403).send({ message: 'Auth token invalid' });
    }

    next();
  }

  public static verifyProfileOwnership(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const id = req.body.id;

    const decodedToken = AuthMiddlewares.getTokenPayload(accessToken);

    const isProfileOwner: boolean = id === decodedToken.id;

    if (!isProfileOwner) {
      return res.status(400).send({ message: 'Unauthorized' });
    }

    next();
  }

  public static verifyRestaurantOwnership(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const restaurantId = req.body.restaurantId;

    const decodedToken = AuthMiddlewares.getTokenPayload(accessToken);

    const isRestaurantOwner: boolean =
      restaurantId === decodedToken.restaurantId;

    if (!isRestaurantOwner) {
      return res.status(400).send({ message: 'Unauthorized' });
    }

    next();
  }

  public static hasCustomerRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.CUSTOMER;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    next();
  }

  public static hasRestaurantOwnerRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.RESTAURANT_OWNER;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    next();
  }

  public static hasDeliveryManRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.DELIVERY_MAN;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    next();
  }

  public static hasTechnicalDepartmentRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.TECHNICAL_DEPARTMENT;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    next();
  }

  public static hasCommercialDepartmentRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.COMERCIAL_DEPARTMENT;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    next();
  }

  public static getTokenPayload(accessToken: string): jwt.JwtPayload {
    const decodedToken: jwt.Jwt = jwt.decode(accessToken, {
      complete: true,
      json: true,
    }) as jwt.Jwt;

    const tokenPayload = decodedToken?.payload as jwt.JwtPayload;
    return tokenPayload;
  }
}
