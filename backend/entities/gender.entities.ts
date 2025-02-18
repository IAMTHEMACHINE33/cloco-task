import { objToQuery } from "../helpers/objToQuery";

export enum Gender {
    Male = "m",
    Female = "f",
    Other = "o"
}

export const gender = `
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
        CREATE TYPE gender AS ENUM (${objToQuery(Gender)});
    END IF;
END $$;
`
