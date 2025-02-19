/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Genre } from './Genre';
import type { IArtist } from './IArtist';
/**
 * Make all properties in T optional
 */
export type Partial_IMusicInput_ = {
    title?: string;
    album_name?: string;
    genre?: Genre;
    artist_id?: (string | IArtist);
};

