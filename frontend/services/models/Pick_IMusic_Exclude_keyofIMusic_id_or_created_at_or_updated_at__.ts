/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Genre } from './Genre';
import type { IArtist } from './IArtist';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_IMusic_Exclude_keyofIMusic_id_or_created_at_or_updated_at__ = {
    title: string;
    album_name: string;
    genre: Genre;
    artist_id: (string | IArtist);
};

