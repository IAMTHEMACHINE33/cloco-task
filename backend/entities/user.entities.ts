import pg from "pg"
import {enumToQuery} from "../helpers/tsenum_to_pgquery"
import { Role } from "./role.entities"
import { Gender } from "./gender.entities"
const { Query } = pg

export interface IUser {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    dob: Date,
    gender: Gender
    address: string,
    role: Role,
    created_at: Date,
    updated_at: Date
}

export const user = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user" (
"id" uuid DEFAULT uuid_generate_v4(),
"first_name" VARCHAR(255),
"last_name" VARCHAR(255),
"email" VARCHAR(255),
"password" VARCHAR(500),
"phone" VARCHAR(20),
"dob" TIMESTAMP,
"gender" GENDER,
"address" VARCHAR(255),
"role" ROLE,
"created_at" TIMESTAMP,
"updated_at" TIMESTAMP,
PRIMARY KEY ("id")
);
`
