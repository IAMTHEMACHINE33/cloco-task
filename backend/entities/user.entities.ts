import pg from "pg"
import { Role } from "./role.entities"
import { Gender } from "./gender.entities"
import { TABLE_NAME } from "../constants"
export interface IUser {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    dob: string,
    gender: Gender
    address: string,
    role: Role,
    created_at: string,
    updated_at: string 
}

export const user = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "${TABLE_NAME.USER}" (
"id" uuid DEFAULT uuid_generate_v4(),
"first_name" VARCHAR(255) NOT NULL,
"last_name" VARCHAR(255) NOT NULL,
"email" VARCHAR(255) UNIQUE NOT NULL,
"password" VARCHAR(500),
"phone" VARCHAR(20) UNIQUE,
"dob" TIMESTAMPTZ,
"gender" GENDER,
"address" VARCHAR(255),
"role" ROLE,
"created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
);
`
