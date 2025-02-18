import { UserService } from '../services/user.services';
import { Controller, Route, Tags, Get, SuccessResponse, Post, Body } from "tsoa";
import { IUser } from "../entities/user.entities"
import * as userValidator from '../validators/user.validator'
import { DatabaseError } from 'pg';

@Route('user')
@Tags('user')
export class UserController extends Controller{
  private userService = new UserService();

  constructor() {
        super()
        this.registerUser = this.registerUser.bind(this);
  }

    @SuccessResponse("201", "Created")
    @Post("/register")
    async registerUser(
    @Body() requestBody: IUser ):Promise<any>{
        try {
            const validation = await userValidator.registerUser(requestBody)
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }
            
            // TODO: encrypt password 
            await this.userService.save<IUser>(requestBody);

            this.setStatus(201)
            return { message: 'User registered successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'Duplicate value'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
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
            const validation = await userValidator.loginUser(requestBody)
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }
            const {email} = requestBody

            const data = await this.userService.getWhereOne<IUser>({email});
            // TODO: decrypt and compare password  

            this.setStatus(200)
            return { message: 'Login successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'Duplicate value'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }
}

