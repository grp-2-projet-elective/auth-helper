import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Roles } from '../models/users.model';

export abstract class AuthMiddlewares {
  public static verifyAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall) {
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

    const decodedToken = AuthMiddlewares.getTokenPayload(accessToken);

    const isSuspende: boolean = decodedToken?.isSuspended ? decodedToken.isSuspended : false;

    if (isSuspende) {
      return res.status(403).send({ message: 'Unauthorized: Suspended profile' });
    }

    return next();
  }

  public static verifyProfileOwnership(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall || (req as any).isCommercialDepartmentCall || (req as any).isTechnicalDepartmentCall) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;
    const id = Number(req.body.id);

    const decodedToken = AuthMiddlewares.getTokenPayload(accessToken);

    const isProfileOwner: boolean = (id === Number(decodedToken.id));
    console.info('id:')
    console.info(id)
    console.info('decodedTokenId:')
    console.info(decodedToken.id)
    console.info('isProfileOwner:')
    console.info(id === decodedToken.id)


    if (!isProfileOwner) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    return next();
  }

  public static verifyRestaurantOwnership(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall || (req as any).isCommercialDepartmentCall || (req as any).isTechnicalDepartmentCall) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;
    const restaurantId: string = req.body.restaurantId;

    const decodedToken = AuthMiddlewares.getTokenPayload(accessToken);

    const isRestaurantOwner: boolean =
      restaurantId === String(decodedToken.restaurantId);

    if (!isRestaurantOwner) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    return next();
  }

  public static hasCustomerRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.CUSTOMER;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    return next();
  }

  public static hasRestaurantOwnerRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.RESTAURANT_OWNER;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    return next();
  }

  public static hasDeliveryManRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.DELIVERY_MAN;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    return next();
  }

  public static hasTechnicalDepartmentRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.TECHNICAL_DEPARTMENT;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    return next();
  }

  public static isTechnicalDepartmentCall(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.TECHNICAL_DEPARTMENT;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role === excpectedRole) {
      (req as any).isTechnicalDepartmentCall = true;
    }

    return next();
  }

  public static hasCommercialDepartmentRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    if ((req as any).isApiCall) {
      return next();
    }

    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.COMERCIAL_DEPARTMENT;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role !== excpectedRole) {
      return res.status(403).send({ message: 'Invalid role' });
    }

    return next();
  }

  public static isCommercialDepartmentCall(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const accessToken: string = req.headers['x-access-token'] as string;
    const excpectedRole = Roles.COMERCIAL_DEPARTMENT;

    const tokenPayload = AuthMiddlewares.getTokenPayload(accessToken);

    if (tokenPayload?.role === excpectedRole) {
      (req as any).isCommercialDepartmentCall = true;
    }

    return next();
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
