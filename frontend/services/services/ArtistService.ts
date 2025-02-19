/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Omit_IArtist_id_or_created_at_or_updated_at_ } from '../models/Omit_IArtist_id_or_created_at_or_updated_at_';
import type { Partial_IArtistInput_ } from '../models/Partial_IArtistInput_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArtistService {
    /**
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static createArtist(
        requestBody: Omit_IArtist_id_or_created_at_or_updated_at_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/artist/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param artistId
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static updateArtist(
        artistId: string,
        requestBody: Partial_IArtistInput_,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/artist/update/{artistId}',
            path: {
                'artistId': artistId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param artistId
     * @returns any Deleted
     * @throws ApiError
     */
    public static deleteArtist(
        artistId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/artist/delete/{artistId}',
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
    public static getArtist(
        pageNumber: number = 1,
        rowsPerPage: number = 10,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/artist',
            query: {
                'pageNumber': pageNumber,
                'rowsPerPage': rowsPerPage,
            },
        });
    }
}
