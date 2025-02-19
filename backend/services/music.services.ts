import { TABLE_NAME } from "../constants"
import { BaseService } from "./base.services"
export class MusicService extends BaseService {
    constructor() {
        super(TABLE_NAME.MUSIC)
    }
}
