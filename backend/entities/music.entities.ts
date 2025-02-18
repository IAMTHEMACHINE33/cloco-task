import { Genre } from "./genre.entities"
import { IArtist } from "./artist.entities"
export interface IMusic {
    title: string,
    album_name: string,
    genre: Genre,
    artist_id: string | IArtist,
    created_at: Date,
    updated_at: Date
}
export const music = `
CREATE TABLE IF NOT EXISTS "music"(
"id" uuid DEFAULT uuid_generate_v4(),
"title" VARCHAR(255),
"album_name" VARCHAR(255),
"genre" GENRE,
"artist_id" uuid,
"created_at" TIMESTAMP,
"updated_at" TIMESTAMP,
PRIMARY KEY("id"),
FOREIGN KEY("artist_id") REFERENCES "artist"("id")
);`;
