/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Gender } from './Gender';
import type { Role } from './Role';
/**
 * Make all properties in T optional
 */
export type Partial_IUserInput_ = {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    dob?: string;
    gender?: Gender;
    address?: string;
    role?: Role;
};

