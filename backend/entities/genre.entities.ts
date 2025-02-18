import { objToQuery } from "../helpers/objToQuery";

export enum Genre {
    rnb = 'rnb',
    country = 'country',
    classic = 'classic',
    rock = 'rock',
    jazz = 'jazz'
}

export const genre = `
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'genre') THEN
        CREATE TYPE genre AS ENUM (${objToQuery(Genre)});
    END IF;
END $$;
`
