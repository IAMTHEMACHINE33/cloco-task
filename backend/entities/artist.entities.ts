import { Gender } from "./gender.entities"
import { TABLE_NAME } from "../constants"

export interface IArtist {
    id: string,
    name: string,
    dob: string,
    gender: Gender,
    first_release_year: number,
    no_of_albums_released: number,
    created_at: string,
    updated_at: string
}

export const artist = `
    CREATE TABLE IF NOT EXISTS "${TABLE_NAME.ARTIST}" (
    "id" uuid DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255),
    "dob" TIMESTAMPTZ,
    "gender" GENDER,
    "first_release_year" INTEGER,
    "no_of_albums_released" INTEGER,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);
`
