/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Gender } from './Gender';
import type { Role } from './Role';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_IUser_Exclude_keyofIUser_id_or_created_at_or_updated_at__ = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    dob: string;
    gender: Gender;
    address: string;
    role: Role;
};

