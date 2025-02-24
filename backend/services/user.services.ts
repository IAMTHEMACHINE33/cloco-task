import { TABLE_NAME } from "../constants"
import { BaseService } from "./base.services"
export class UserService extends BaseService {
    constructor(view?: string) {
        super(view || TABLE_NAME.USER) }
}
