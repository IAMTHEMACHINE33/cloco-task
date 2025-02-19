/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Gender } from './Gender';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_IArtist_Exclude_keyofIArtist_id_or_created_at_or_updated_at__ = {
    dob: string;
    gender: Gender;
    name: string;
    first_release_year: number;
    no_of_albums_released: number;
};

