import { Gender } from "./gender.entities"

export interface IArtist {
    name: string,
    dob: Date,
    gender: Gender,
    first_release_year: number,
    no_of_albums_released: number,
    created_at: Date,
    updaetd_at: Date
}

export const artist = `
    CREATE TABLE IF NOT EXISTS "artist" (
    "id" uuid DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255),
    "dob" TIMESTAMP,
    "gender" GENDER,
    "first_release_year" INTEGER,
    "no_of_albums_released" INTEGER,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id")
);
`
