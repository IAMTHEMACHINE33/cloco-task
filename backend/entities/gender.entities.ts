import { enumToQuery } from "../helpers/tsenum_to_pgquery";
import pg from "pg";
const { Query } = pg

export enum Gender {
    Male = "m",
    Female = "f",
    Other = "o"
}

export const gender = `
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
        CREATE TYPE gender AS ENUM (${enumToQuery(Gender)});
    END IF;
END $$;
`
