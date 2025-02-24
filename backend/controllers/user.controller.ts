import { UserService } from '../services/user.services';
import express from 'express'
import { Controller, Route, Tags, Get, SuccessResponse, Post, Body, Patch, Delete, Path, Security, Query, Request } from "tsoa";
import { IUser } from "../entities/user.entities"
import * as userValidator from '../validators/user.validator'
import { DatabaseError } from 'pg';
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from '../entities/role.entities';
import { TABLE_VIEW } from '../constants';
dotenv.config()

export type IUserInput = Omit<IUser, "id"|"created_at"|"updated_at">
export type IUserOptional = Partial<IUserInput>
@Route('user')
@Tags('user')
export class UserController extends Controller{
  private userService = new UserService();
  private userViewService = new UserService(TABLE_VIEW.USER_VIEW);

  constructor() {
        super()
        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUser = this.getUser.bind(this);
  }

    @SuccessResponse("201", "Created")
    @Post("/register")
    async registerUser(
    @Body() requestBody: IUserInput):Promise<any>{
        try {
            const validation = await userValidator.registerUser(requestBody)
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }
            
            // TODO: encrypt password 
            await this.userService.save<IUser>(requestBody);

            this.setStatus(201)
            return { success: true, message: 'User registered successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { success: false, message: 'User already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { success: false, message: 'Something went wrong' };
        }
    }

    @SuccessResponse("200", "Created")
    @Post("/login")
    async loginUser(
    @Body() requestBody: {
            email: string,
            password: string
        }):Promise<any>{
        try {
            this.setStatus(400)
            const validation = await userValidator.loginUser(requestBody)
            if (!validation.success) {
                return { message: validation.data}
            }
            const {email} = requestBody

            const data = await this.userService.getWhereOne<IUser>({email});
            // TODO: decrypt and compare password  
            if (!data){
                return {message: "Invalid Credentials!"}
            }
            const token = jwt.sign({
                data: data.id
            }, process.env.JWT_SECRET as string, { expiresIn: '8h' });

            this.setStatus(200)
            return { message: 'Login successfully' , token: token};
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'User already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.SuperAdmin])
    @SuccessResponse("200", "Updated")
    @Patch("/update/{userId}")
    async updateUser(
        @Path('userId') userId: string,
        @Body() requestBody: IUserOptional
    ):Promise<any>{
        try {
            console.log('userId',userId)
            const validation = await userValidator.updateUser({...requestBody, id: userId})
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }

            // TODO: decrypt and compare password  
            await this.userService.updateWhere<IUser>({id: userId}, requestBody)

            this.setStatus(200)
            return { message: 'Updated successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'User already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.SuperAdmin])
    @SuccessResponse("200", "Deleted")
    @Delete("/delete/{userId}")
    async deleteUser(
        @Path() userId: string 
    ):Promise<any>{
        try {
            const validation = await userValidator.deleteUser({id: userId})
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }

            // TODO: Do not allow self deletion
            await this.userService.deleteWhere({id: userId})
            this.setStatus(200)
            return { message: 'Deleted successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'User already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.SuperAdmin])
    @SuccessResponse("200", "Fetched")
    @Get("/")
    async getUser(
        @Query() pageNumber: number = 1,
        @Query() rowsPerPage: number = 10,
    ):Promise<any>{
        try {
            const data = await this.userViewService.getAll(pageNumber, rowsPerPage);
            return { message: 'Successfully fetched', data: data};
        } catch (error) {
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }


    @Security("jwt", [Role.SuperAdmin, Role.Artist, Role.ArtistManager])
    @SuccessResponse("200", "Fetched")
    @Get("/userDetails")
    async getUserDetails(
    @Request() request: express.Request & {user: IUser}
    ):Promise<{message: string, data?: IUser}>{
        try {
            const data = request.user;
            return { message: 'Successfully fetched', data: data};
        } catch (error) {
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }
}

