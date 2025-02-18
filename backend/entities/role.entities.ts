import { objToQuery } from "../helpers/objToQuery";

export enum Role {
    SuperAdmin = "super_admin",
    ArtistManager = "artist_manager",
    Artist = "artist"
}

export const role =`
    DO $$ 
    BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
        CREATE TYPE "role"
        AS ENUM (${objToQuery(Role)});
    END IF;
    END $$;
`;
