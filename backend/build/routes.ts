/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MusicController } from './../controllers/music.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ArtistController } from './../controllers/artist.controller';
import { expressAuthentication } from './../middlewares/authentication.middleware';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Gender": {
        "dataType": "refEnum",
        "enums": ["m","f","o"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Role": {
        "dataType": "refEnum",
        "enums": ["super_admin","artist_manager","artist"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IUser.Exclude_keyofIUser.id-or-created_at-or-updated_at__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"first_name":{"dataType":"string","required":true},"last_name":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"password":{"dataType":"string","required":true},"phone":{"dataType":"string","required":true},"dob":{"dataType":"string","required":true},"gender":{"ref":"Gender","required":true},"address":{"dataType":"string","required":true},"role":{"ref":"Role","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IUser.id-or-created_at-or-updated_at_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IUser.Exclude_keyofIUser.id-or-created_at-or-updated_at__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserInput": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_IUser.id-or-created_at-or-updated_at_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_IUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"first_name":{"dataType":"string"},"last_name":{"dataType":"string"},"email":{"dataType":"string"},"password":{"dataType":"string"},"phone":{"dataType":"string"},"dob":{"dataType":"string"},"gender":{"ref":"Gender"},"address":{"dataType":"string"},"role":{"ref":"Role"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserOptional": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_IUserInput_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Genre": {
        "dataType": "refEnum",
        "enums": ["rnb","country","classic","rock","jazz"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IArtist": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "dob": {"dataType":"string","required":true},
            "gender": {"ref":"Gender","required":true},
            "first_release_year": {"dataType":"double","required":true},
            "no_of_albums_released": {"dataType":"double","required":true},
            "created_at": {"dataType":"string","required":true},
            "updated_at": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IMusic.Exclude_keyofIMusic.id-or-created_at-or-updated_at__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","required":true},"album_name":{"dataType":"string","required":true},"genre":{"ref":"Genre","required":true},"artist_id":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"IArtist"}],"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IMusic.id-or-created_at-or-updated_at_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IMusic.Exclude_keyofIMusic.id-or-created_at-or-updated_at__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMusicInput": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_IMusic.id-or-created_at-or-updated_at_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_IMusicInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"album_name":{"dataType":"string"},"genre":{"ref":"Genre"},"artist_id":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"IArtist"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMusicOptional": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_IMusicInput_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IArtist.Exclude_keyofIArtist.id-or-created_at-or-updated_at__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"dob":{"dataType":"string","required":true},"gender":{"ref":"Gender","required":true},"name":{"dataType":"string","required":true},"first_release_year":{"dataType":"double","required":true},"no_of_albums_released":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IArtist.id-or-created_at-or-updated_at_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IArtist.Exclude_keyofIArtist.id-or-created_at-or-updated_at__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IArtistInput": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_IArtist.id-or-created_at-or-updated_at_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_IArtistInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"dob":{"dataType":"string"},"gender":{"ref":"Gender"},"name":{"dataType":"string"},"first_release_year":{"dataType":"double"},"no_of_albums_released":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IArtistOptional": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_IArtistInput_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_registerUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IUserInput"},
        };
        app.post('/user/register',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.registerUser)),

            async function UserController_registerUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_registerUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'registerUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_loginUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
        };
        app.post('/user/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.loginUser)),

            async function UserController_loginUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_loginUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'loginUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IUserOptional"},
        };
        app.patch('/user/update/:userId',
            authenticateMiddleware([{"jwt":["super_admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
        };
        app.delete('/user/delete/:userId',
            authenticateMiddleware([{"jwt":["super_admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUser: Record<string, TsoaRoute.ParameterSchema> = {
                pageNumber: {"default":1,"in":"query","name":"pageNumber","dataType":"double"},
                rowsPerPage: {"default":10,"in":"query","name":"rowsPerPage","dataType":"double"},
        };
        app.get('/user',
            authenticateMiddleware([{"jwt":["super_admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUser)),

            async function UserController_getUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMusicController_createMusic: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IMusicInput"},
        };
        app.post('/music/create',
            authenticateMiddleware([{"jwt":["artist"]}]),
            ...(fetchMiddlewares<RequestHandler>(MusicController)),
            ...(fetchMiddlewares<RequestHandler>(MusicController.prototype.createMusic)),

            async function MusicController_createMusic(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMusicController_createMusic, request, response });

                const controller = new MusicController();

              await templateService.apiHandler({
                methodName: 'createMusic',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMusicController_updateMusic: Record<string, TsoaRoute.ParameterSchema> = {
                musicId: {"in":"path","name":"musicId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IMusicOptional"},
        };
        app.patch('/music/update/:musicId',
            authenticateMiddleware([{"jwt":["artist"]}]),
            ...(fetchMiddlewares<RequestHandler>(MusicController)),
            ...(fetchMiddlewares<RequestHandler>(MusicController.prototype.updateMusic)),

            async function MusicController_updateMusic(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMusicController_updateMusic, request, response });

                const controller = new MusicController();

              await templateService.apiHandler({
                methodName: 'updateMusic',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMusicController_deleteMusic: Record<string, TsoaRoute.ParameterSchema> = {
                musicId: {"in":"path","name":"musicId","required":true,"dataType":"string"},
        };
        app.delete('/music/delete/:musicId',
            authenticateMiddleware([{"jwt":["artist"]}]),
            ...(fetchMiddlewares<RequestHandler>(MusicController)),
            ...(fetchMiddlewares<RequestHandler>(MusicController.prototype.deleteMusic)),

            async function MusicController_deleteMusic(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMusicController_deleteMusic, request, response });

                const controller = new MusicController();

              await templateService.apiHandler({
                methodName: 'deleteMusic',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMusicController_getArtistMusic: Record<string, TsoaRoute.ParameterSchema> = {
                artistId: {"in":"path","name":"artistId","required":true,"dataType":"string"},
        };
        app.get('/music/:artistId',
            authenticateMiddleware([{"jwt":["super_admin","artist_manager","artist"]}]),
            ...(fetchMiddlewares<RequestHandler>(MusicController)),
            ...(fetchMiddlewares<RequestHandler>(MusicController.prototype.getArtistMusic)),

            async function MusicController_getArtistMusic(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMusicController_getArtistMusic, request, response });

                const controller = new MusicController();

              await templateService.apiHandler({
                methodName: 'getArtistMusic',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMusicController_getMusic: Record<string, TsoaRoute.ParameterSchema> = {
                pageNumber: {"default":1,"in":"query","name":"pageNumber","dataType":"double"},
                rowsPerPage: {"default":10,"in":"query","name":"rowsPerPage","dataType":"double"},
        };
        app.get('/music',
            authenticateMiddleware([{"jwt":["super_admin","artist_manager","artist"]}]),
            ...(fetchMiddlewares<RequestHandler>(MusicController)),
            ...(fetchMiddlewares<RequestHandler>(MusicController.prototype.getMusic)),

            async function MusicController_getMusic(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMusicController_getMusic, request, response });

                const controller = new MusicController();

              await templateService.apiHandler({
                methodName: 'getMusic',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsArtistController_createArtist: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IArtistInput"},
        };
        app.post('/artist/create',
            authenticateMiddleware([{"jwt":["artist_manager"]}]),
            ...(fetchMiddlewares<RequestHandler>(ArtistController)),
            ...(fetchMiddlewares<RequestHandler>(ArtistController.prototype.createArtist)),

            async function ArtistController_createArtist(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsArtistController_createArtist, request, response });

                const controller = new ArtistController();

              await templateService.apiHandler({
                methodName: 'createArtist',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsArtistController_updateArtist: Record<string, TsoaRoute.ParameterSchema> = {
                artistId: {"in":"path","name":"artistId","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IArtistOptional"},
        };
        app.patch('/artist/update/:artistId',
            authenticateMiddleware([{"jwt":["artist_manager"]}]),
            ...(fetchMiddlewares<RequestHandler>(ArtistController)),
            ...(fetchMiddlewares<RequestHandler>(ArtistController.prototype.updateArtist)),

            async function ArtistController_updateArtist(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsArtistController_updateArtist, request, response });

                const controller = new ArtistController();

              await templateService.apiHandler({
                methodName: 'updateArtist',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsArtistController_deleteArtist: Record<string, TsoaRoute.ParameterSchema> = {
                artistId: {"in":"path","name":"artistId","required":true,"dataType":"string"},
        };
        app.delete('/artist/delete/:artistId',
            authenticateMiddleware([{"jwt":["artist_manager"]}]),
            ...(fetchMiddlewares<RequestHandler>(ArtistController)),
            ...(fetchMiddlewares<RequestHandler>(ArtistController.prototype.deleteArtist)),

            async function ArtistController_deleteArtist(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsArtistController_deleteArtist, request, response });

                const controller = new ArtistController();

              await templateService.apiHandler({
                methodName: 'deleteArtist',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsArtistController_getArtist: Record<string, TsoaRoute.ParameterSchema> = {
                pageNumber: {"default":1,"in":"query","name":"pageNumber","dataType":"double"},
                rowsPerPage: {"default":10,"in":"query","name":"rowsPerPage","dataType":"double"},
        };
        app.get('/artist',
            authenticateMiddleware([{"jwt":["super_admin","artist_manager"]}]),
            ...(fetchMiddlewares<RequestHandler>(ArtistController)),
            ...(fetchMiddlewares<RequestHandler>(ArtistController.prototype.getArtist)),

            async function ArtistController_getArtist(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsArtistController_getArtist, request, response });

                const controller = new ArtistController();

              await templateService.apiHandler({
                methodName: 'getArtist',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
