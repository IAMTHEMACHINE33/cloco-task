import { type SafeParseError } from "zod";

export const zodErrorMessage = (zodError: SafeParseError<object>): object => {
    const zodErrorPath = zodError?.error.issues.map(issue => issue.path);
    const zodErrorMessage = zodError?.error.issues.map(issue => issue.message);
    const zodErrorObject: any = {};

    for (let i = 0; i < zodErrorPath.length; i++) {
        const path = zodErrorPath[i][0];
        if (!zodErrorObject[path]) {
            zodErrorObject[path] = [zodErrorMessage[i]];
        } else {
            zodErrorObject[path].push(zodErrorMessage[i]);
        }
    }

    return zodErrorObject;
};
