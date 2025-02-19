import { TABLE_NAME } from "../constants"
import { BaseService } from "./base.services"
export class ArtistService extends BaseService {
    constructor() {
        super(TABLE_NAME.ARTIST)
    }
}
