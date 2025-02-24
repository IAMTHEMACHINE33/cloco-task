/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Gender } from './Gender';
import type { Role } from './Role';
export type IUser = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    dob: string;
    gender: Gender;
    address: string;
    role: Role;
    created_at: string;
    updated_at: string;
};

