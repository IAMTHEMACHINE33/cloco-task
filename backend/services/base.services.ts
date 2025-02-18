import { db } from "../connections/postgres.connection"
import { objToQuery, objToKeyQuery, objToWhereQuery } from "../helpers/objToQuery"
export class BaseService {
    private table_name: string;

    constructor(table_name: string) {
        this.table_name = table_name;
    }

    async save<T>(data: Partial<T>) {
        return await db.query
            (
                `INSERT INTO "${this.table_name}"
                (${objToKeyQuery(data)})
                VALUES (${objToQuery(data)});`
            )
    }

    async getWhereOne<T>(where: Partial<T>): Promise<T>{
        return (await db.query
            (
                `SELECT * FROM "${this.table_name}"
                WHERE ${objToWhereQuery(where)}
                LIMIT 1;`
            )).rows[0]
    }
}
