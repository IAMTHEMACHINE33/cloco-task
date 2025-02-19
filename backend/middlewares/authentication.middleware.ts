import * as express from "express";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { AuthenticationError } from "../utils/customError";
import { UserService } from "../services/user.services";
import { IUser } from "../entities/user.entities";
dotenv.config()

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes: string[]
): Promise<any> {
    console.log('securityName',securityName)
    console.log('scopes', scopes)
    if (securityName !== "jwt") 
        return Promise.reject(new Error("JWT not found"));

    const token =
      request.body.token ||
      request.headers.authorization
    console.log('token', token)

    return new Promise((resolve, reject) => {
      if (!token) {
        reject( new AuthenticationError('JWT token is missing or invalid'));
      }
      jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
        if (err) {
          reject(err);
        } else {
            // Get
                const userService = new UserService()
                const user = await userService.getWhereOne<IUser>({id: decoded.data})
                if (!user) reject( new AuthenticationError('JWT token is missing or invalid'));

                if (!scopes.includes(user.role)) {
                    reject(new AuthenticationError('JWT does not contain required scope.'));
                }
                resolve(user);
            }
        });
    });

}
