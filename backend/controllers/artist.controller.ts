import { Controller, Route, Tags, Get, SuccessResponse, Post, Body, Patch, Delete, Path, Security } from "tsoa";
import { DatabaseError } from 'pg';
import { IArtist } from "../entities/artist.entities";
import { ArtistService } from "../services/artist.services";
import * as artistValidator from "../validators/artist.validator"
import { Role } from "../entities/role.entities";

export type IArtistInput = Omit<IArtist, "id"|"created_at"|"updated_at">
export type IArtistOptional = Partial<IArtistInput>
@Route('artist')
@Tags('artist')
export class ArtistController extends Controller{
  private artistService = new ArtistService();

  constructor() {
        super()
        this.createArtist = this.createArtist.bind(this);
        this.updateArtist = this.updateArtist.bind(this);
        this.deleteArtist = this.deleteArtist.bind(this);
        this.getArtist = this.getArtist.bind(this);
  }

    @Security("jwt", [Role.ArtistManager])
    @SuccessResponse("201", "Created")
    @Post("/create")
    async createArtist(
    @Body() requestBody: IArtistInput):Promise<any>{
        try {
            const validation = await artistValidator.createArtist(requestBody)
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }
            
            await this.artistService.save<IArtist>(requestBody)

            this.setStatus(201)
            return { message: 'Artist created successfully' };
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

    @Security("jwt", [Role.ArtistManager])
    @SuccessResponse("200", "Updated")
    @Patch("/update/{artistId}")
    async updateArtist(
        @Path('artistId') artistId: string,
        @Body() requestBody: IArtistOptional
    ):Promise<any>{
        try {
            const validation = await artistValidator.updateArtist({...requestBody, id: artistId})
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }

            // TODO: decrypt and compare password  
            await this.artistService.updateWhere<IArtist>({id: artistId}, requestBody)

            this.setStatus(200)
            return { message: 'Updated successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'Artists already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.ArtistManager])
    @SuccessResponse("200", "Deleted")
    @Delete("/delete/{artistId}")
    async deleteArtist(
    @Path() artistId: string 
    ):Promise<any>{
        try {
            const validation = await artistValidator.deleteArtist({id: artistId})
            if (!validation.success) {
                this.setStatus(400)
                return { message: validation.data}
            }

            // TODO: Do not allow self deletion
            await this.artistService.deleteWhere({id: artistId})
            this.setStatus(200)
            return { message: 'Deleted successfully' };
        } catch (error) {
            if (error instanceof DatabaseError) {
                switch(error.code) {
                    case '23505': {
                        this.setStatus(400)
                        return { message: 'Artist already exists'}
                    }
                }
            }
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }

    @Security("jwt", [Role.SuperAdmin, Role.ArtistManager])
    @SuccessResponse("200", "Fetched")
    @Get("/")
    async getArtist():Promise<any>{
        try {
            const data = await this.artistService.getAll();
            return { message: 'Successfully fetched', data: data};
        } catch (error) {
            console.error(error)
            this.setStatus(500)
            return { message: 'Something went wrong' };
        }
    }
}

