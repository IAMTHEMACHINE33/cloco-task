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


    async getWhere<T>(where: Partial<T>): Promise<T[]>{
        return (await db.query
            (
                `SELECT * FROM "${this.table_name}"
                WHERE ${objToWhereQuery(where)};`
            )).rows
    }

    async updateWhere<T>(where: Partial<T>, change: Partial<T>) {
        return (await db.query
            (
                `UPDATE "${this.table_name}"
                SET ${objToWhereQuery(change, ', ')}
                WHERE ${objToWhereQuery(where)};`
            )
        )
    }

    async deleteWhere<T>(where: Partial<T>){
        return (await db.query
            (
                `DELETE FROM "${this.table_name}"
                WHERE ${objToWhereQuery(where)};`
            )
        )
    }

    async getAll() {
        return (await db.query
        (
        `SELECT * FROM "${this.table_name}";`
        )).rows
    }
}
