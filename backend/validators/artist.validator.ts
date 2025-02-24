import { z } from "zod";
import { zodErrorMessage } from "../utils/zodErrorMessage"
import { Gender } from "../entities/gender.entities";
import { IArtist } from "../entities/artist.entities";

export const createArtist = async(req: Partial<IArtist>) => {
    const year = (new Date()).getFullYear()
    const schema = z.object({
        name: z
        .string(),
        dob: z
        .string()
        .datetime(),
        gender: z
        .nativeEnum(Gender),
        first_release_year: z
        .number()
        .min(2000)
        .max(year),
        no_of_albums_released: z
        .number()
        .positive()
    })

    const enterDetails = req

    const parsedInput = await schema.safeParseAsync(enterDetails);
    if (!parsedInput.success) {
        const returnMessage = zodErrorMessage(parsedInput);
        return { success: false, data: returnMessage};
    }
    return { success: true }
}

export const updateArtist = async(req: Partial<IArtist>) => {
    const year = (new Date()).getFullYear()
    const schema = z.object({
        name: z
        .string()
        .optional(),
        dob: z
        .string()
        .datetime()
        .optional(),
        gender: z
        .nativeEnum(Gender)
        .optional(),
        first_release_year: z
        .number()
        .min(2000)
        .max(year)
        .optional(),
        no_of_albums_released: z
        .number()
        .positive()
        .optional()
    })

    const enterDetails = req
    console.log('from', req)


    const parsedInput = await schema.safeParseAsync(enterDetails);
    if (!parsedInput.success) {
        const returnMessage = zodErrorMessage(parsedInput);
        return { success: false, data: returnMessage};
    }
    return { success: true }
}

export const deleteArtist = async(req: Partial<IArtist>) => {
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
