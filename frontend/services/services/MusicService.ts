/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Omit_IMusic_id_or_created_at_or_updated_at_ } from '../models/Omit_IMusic_id_or_created_at_or_updated_at_';
import type { Partial_IMusicInput_ } from '../models/Partial_IMusicInput_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MusicService {
    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static createMusic(
        requestBody: Omit_IMusic_id_or_created_at_or_updated_at_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/music/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param musicId
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static updateMusic(
        musicId: string,
        requestBody: Partial_IMusicInput_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/music/update/{musicId}',
            path: {
                'musicId': musicId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param musicId
     * @returns any Deleted
     * @throws ApiError
     */
    public static deleteMusic(
        musicId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/music/delete/{musicId}',
            path: {
                'musicId': musicId,
            },
        });
    }
    /**
     * @param artistId
     * @returns any Fetched
     * @throws ApiError
     */
    public static getArtistMusic(
        artistId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/music/{artistId}',
            path: {
                'artistId': artistId,
            },
        });
    }
    /**
     * @param pageNumber
     * @param rowsPerPage
     * @returns any Fetched
     * @throws ApiError
     */
    public static getMusic(
        pageNumber: number = 1,
        rowsPerPage: number = 10,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/music',
            query: {
                'pageNumber': pageNumber,
                'rowsPerPage': rowsPerPage,
            },
        });
    }
}
