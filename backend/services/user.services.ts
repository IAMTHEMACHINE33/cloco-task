import { TABLE_NAME } from "../constants"
import { BaseService } from "./base.services"
export class UserService extends BaseService {
    constructor() {
        super(TABLE_NAME.USER)
    }
}
