/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IUser } from '../models/IUser';
import type { Omit_IUser_id_or_created_at_or_updated_at_ } from '../models/Omit_IUser_id_or_created_at_or_updated_at_';
import type { Partial_IUserInput_ } from '../models/Partial_IUserInput_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static registerUser(
        requestBody: Omit_IUser_id_or_created_at_or_updated_at_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static loginUser(
        requestBody: {
            password: string;
            email: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static updateUser(
        userId: string,
        requestBody: Partial_IUserInput_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/update/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @returns any Deleted
     * @throws ApiError
     */
    public static deleteUser(
        userId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/delete/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @param pageNumber
     * @param rowsPerPage
     * @returns any Fetched
     * @throws ApiError
     */
    public static getUser(
        pageNumber: number = 1,
        rowsPerPage: number = 10,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
            query: {
                'pageNumber': pageNumber,
                'rowsPerPage': rowsPerPage,
            },
        });
    }
    /**
     * @returns any Fetched
     * @throws ApiError
     */
    public static getUserDetails(): CancelablePromise<{
        data?: IUser;
        message: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/userDetails',
        });
    }
}
