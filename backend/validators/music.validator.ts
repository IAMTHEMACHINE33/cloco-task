import { z } from "zod";
import { zodErrorMessage } from "../utils/zodErrorMessage"
import { Gender } from "../entities/gender.entities";
import { IMusic } from "../entities/music.entities";
import { Genre } from "../entities/genre.entities";

export const createMusic = async(req: Partial<IMusic>) => {
    const schema = z.object({
        title: z
        .string(),
        album_name: z
        .string(),
        genre: z
        .nativeEnum(Genre),
        artist_id: z
        .string()
        .uuid()
        .optional()
    })

    const enterDetails = req

    const parsedInput = await schema.safeParseAsync(enterDetails);
    if (!parsedInput.success) {
        const returnMessage = zodErrorMessage(parsedInput);
        return { success: false, data: returnMessage};
    }
    return { success: true }
}

export const updateMusic = async(req: Partial<IMusic>) => {
    const schema = z.object({
        title: z
        .string()
        .optional(),
        album_name: z
        .string()
        .optional(),
        genre: z
        .nativeEnum(Genre)
        .optional(),
        artist_id: z
        .string()
        .uuid()
        .optional()
    })

    const enterDetails = req


    const parsedInput = await schema.safeParseAsync(enterDetails);
    if (!parsedInput.success) {
        const returnMessage = zodErrorMessage(parsedInput);
        return { success: false, data: returnMessage};
    }
    return { success: true }
}

export const deleteMusic = async(req: Partial<IMusic>) => {
    const schema = z.object({
        id: z
        .string()
        .uuid()
    })

    const enterDetails = req

    const parsedInput = await schema.safeParseAsync(enterDetails);
    if (!parsedInput.success) {
        const returnMessage = zodErrorMessage(parsedInput);
        return { success: false, data: returnMessage};
    }
    return { success: true }
}
