import { Controller, Route, Tags, Get, SuccessResponse, Post, Body, Patch, Delete, Path, Security } from "tsoa";
import { DatabaseError } from 'pg';
import { IMusic } from "../entities/music.entities";
import * as musicValidator from "../validators/music.validator"
import { MusicService } from "../services/music.services";
import { Role } from "../entities/role.entities";

export type IMusicInput = Omit<IMusic, "id"|"created_at"|"updated_at">
export type IMusicOptional = Partial<IMusicInput>

@Route('music')
@Tags('music')
export class MusicController extends Controller{
  private musicService = new MusicService();

  constructor() {
        super()
        this.createMusic = this.createMusic.bind(this);
        this.updateMusic = this.updateMusic.bind(this);
        this.deleteMusic = this.deleteMusic.bind(this);
        this.getMusic = this.getMusic.bind(this);
  }

    @Security("jwt", [Role.Artist])
    @SuccessResponse("201", "Created")
    @Post("/create")
    async createMusic(
    @Body() requestBody: IMusicInput):Promise<any>{
        try {
            const validation = await musicValidator.createMusic(requestBody)
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }
            
            await this.musicService.save<IMusic>(requestBody)

            this.setStatus(201)
            return { message: 'Music created successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'Duplicate value'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.Artist])
    @SuccessResponse("200", "Updated")
    @Patch("/update/{musicId}")
    async updateMusic(
        @Path('musicId') musicId: string,
        @Body() requestBody: IMusicOptional
    ):Promise<any>{
        try {
            const validation = await musicValidator.updateMusic({...requestBody, id: musicId})
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }

            await this.musicService.updateWhere<IMusic>({id: musicId}, requestBody)

            this.setStatus(200)
            return { message: 'Updated successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'Musics already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.Artist])
    @SuccessResponse("200", "Deleted")
    @Delete("/delete/{musicId}")
    async deleteMusic(
    @Path() musicId: string 
    ):Promise<any>{
        try {
            const validation = await musicValidator.deleteMusic({id: musicId})
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }

            // TODO: Do not allow self deletion
            await this.musicService.deleteWhere({id: musicId})
            this.setStatus(200)
            return { message: 'Deleted successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'Music already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }


    @Security("jwt", [Role.SuperAdmin, Role.ArtistManager, Role.Artist])
    @SuccessResponse("200", "Fetched")
    @Get("/{artistId}")
    async getArtistMusic(
        @Path('artistId') artistId: string
    ):Promise<any>{
        try {
            const data = await this.musicService.getWhere({artist_id: artistId});
            return { message: 'Successfully fetched', data: data};
        } catch (error) {
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.SuperAdmin, Role.ArtistManager, Role.Artist])
    @SuccessResponse("200", "Fetched")
    @Get("/")
    async getMusic():Promise<any>{
        try {
            const data = await this.musicService.getAll();
            return { message: 'Successfully fetched', data: data};
        } catch (error) {
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }
}

