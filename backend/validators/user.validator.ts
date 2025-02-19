import { z } from "zod";
import { zodErrorMessage } from "../utils/zodErrorMessage"
import { Gender } from "../entities/gender.entities";
import { Role } from "../entities/role.entities";
import { IUser } from "../entities/user.entities";

export const registerUser = async(req: Partial<IUser>) => {
    const schema = z.object({
        first_name: z
        .string()
        .min(2, "Minimum characters required: 3"),
        last_name: z
        .string()
        .min(2, "Minimum characters required: 3"),
        email: z
        .string()
        .email(),
        password: z
        .string()
        .min(8, "Minimum characters required: 8"),
        phone: z
        .string()
        .min(10, "Minimum characters required: 10")
        .max(10, "Maximum characters required: 10"),
        dob: z
        .string()
        .datetime(),
        gender: z
        .nativeEnum(Gender),
        address:z
        .string(),
        role: z
        .nativeEnum(Role)
    })

    const enterDetails = req

    const parsedInput = await schema.safeParseAsync(enterDetails);
    if (!parsedInput.success) {
        const returnMessage = zodErrorMessage(parsedInput);
        return { success: false, data: returnMessage};
    }
    return { success: true }
}

export const loginUser = async(req: Partial<IUser>) => {
    const schema = z.object({
        email: z
        .string()
        .email(),
        password: z
        .string()
        .min(8, "Minimum characters required: 8"),
    })

    const enterDetails = req

    const parsedInput = await schema.safeParseAsync(enterDetails);
    if (!parsedInput.success) {
        const returnMessage = zodErrorMessage(parsedInput);
        return { success: false, data: returnMessage};
    }
    return { success: true }
}

export const updateUser = async(req: Partial<IUser>) => {
    const schema = z.object({
        id: z
        .string()
        .uuid(),
        first_name: z
        .string()
        .min(2, "Minimum characters required: 3")
        .optional(),
        last_name: z
        .string()
        .min(2, "Minimum characters required: 3")
        .optional(),
        email: z
        .string()
        .email()
        .optional(),
        password: z
        .string()
        .min(8, "Minimum characters required: 8")
        .optional(),
        phone: z
        .string()
        .min(10, "Minimum characters required: 10")
        .max(10, "Maximum characters required: 10")
        .optional(),
        dob: z
        .string()
        .datetime()
        .optional(),
        gender: z
        .nativeEnum(Gender)
        .optional(),
        address:z
        .string()
        .optional(),
        role: z
        .nativeEnum(Role)
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

export const deleteUser = async(req: Partial<IUser>) => {
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
