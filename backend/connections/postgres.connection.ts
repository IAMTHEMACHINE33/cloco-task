import { Pool, Client, DatabaseError } from 'pg';
import { user } from "../entities/user.entities"
import { role } from "../entities/role.entities"
import { gender } from "../entities/gender.entities"
import { artist } from "../entities/artist.entities"
import { genre } from "../entities/genre.entities"
import { music } from "../entities/music.entities"
import dotenv from 'dotenv';
dotenv.config();

export const db = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: +(process.env.DB_PORT || 5432),
    host: process.env.DB_HOST|| 'localhost'
});

export const connectDb = async () => {
    try {
        await db.connect()
        console.log('Database connected successfully!')
    }
    catch (e) {
        if (e instanceof DatabaseError) {
            switch(e.code) {
                case '3D000': {
                    console.error('Database does not exists!');
                    try {
                        const client = new Client({
                            user: process.env.DB_USER,
                            database: 'postgres',
                            password: process.env.DB_PASSWORD,
                            port: +(process.env.DB_PORT || 5432),
                            host: process.env.DB_HOST
                        }) 

                        await client.connect()
                        await client.query(`CREATE DATABASE ${process.env.DB_NAME};`)
                        await client.end()
                        console.log('Database created successfully!');

                        await db.connect()
                        console.log('Database connected successfully!')
                    }
                    catch (e1) {
                        console.error('Database failed to create! error: ', e1);
                        process.exit(1)
                    }
                    break;
                }
                default: {
                    console.error('Database connection failed:', e.message);
                    process.exit(1);
                }
            }
        }
        else {
            console.error('Unknown error occurred:', e);
            process.exit(1);
        }
    }
    createTables()

};

export const createTables = async () => {
    const client = await db.connect();
    const entities = [role, gender, user, genre, artist, music]
    entities.forEach(async query => await client.query(query))
    client.release()
}
