/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Genre } from './Genre';
import type { IArtist } from './IArtist';
export type IMusic = {
    id: string;
    title: string;
    album_name: string;
    genre: Genre;
    artist_id: (string | IArtist);
    created_at: string;
    updated_at: string;
};

