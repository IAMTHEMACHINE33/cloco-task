import * as express from "express";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { AuthenticationError, AuthorizationError} from "../utils/customError";
import { UserService } from "../services/user.services";
import { IUser } from "../entities/user.entities";
import { TABLE_VIEW } from "../constants";
dotenv.config()

export function expressAuthentication(
  request: express.Request & {user: IUser},
  securityName: string,
  scopes: string[]
): Promise<any> {
    if (securityName !== "jwt") 
        return Promise.reject(new Error("JWT not found"));

    let token =
      request.body.token || request.headers.authorization


    return new Promise((resolve, reject) => {

        if (!token) {
            reject( new AuthenticationError('JWT token is missing or invalid'));
        }

        token = token.replace("Bearer ", "")

        jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
            if (err) {
                reject(err);
            } else {
                // Get
                const userService = new UserService(TABLE_VIEW.USER_VIEW)
                const user = await userService.getWhereOne<IUser>({id: decoded.data})
                if (!user) reject( new AuthenticationError('JWT token is missing or invalid'));

                if (!scopes.includes(user.role)) {
                    reject(new AuthorizationError('Not allowed'));
                }
                request.user = user
                resolve(user);
            }
        });
    });

}
