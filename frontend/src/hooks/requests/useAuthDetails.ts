import {ROLES} from "../../constant/roles"
import { STORAGE_KEY } from "@/constant/storage_keys"

export type RolesType = typeof ROLES;

export const useAuthRole = (): string => {
    return localStorage.getItem(STORAGE_KEY.ROLE) || "";
}

export const useAuthToken = (): string => {
    return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) || "";
}
