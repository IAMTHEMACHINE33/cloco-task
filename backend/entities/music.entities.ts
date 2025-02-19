import { Genre } from "./genre.entities"
import { IArtist } from "./artist.entities"
import { TABLE_NAME } from "../constants"
export interface IMusic {
    id: string,
    title: string,
    album_name: string,
    genre: Genre,
    artist_id: string | IArtist,
    created_at: string,
    updated_at: string
}
export const music = `
CREATE TABLE IF NOT EXISTS "${TABLE_NAME.MUSIC}"(
"id" uuid DEFAULT uuid_generate_v4(),
"title" VARCHAR(255),
"album_name" VARCHAR(255),
"genre" GENRE,
"artist_id" uuid,
"created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
"updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY("id"),
FOREIGN KEY("artist_id") REFERENCES "artist"("id")
);`;
