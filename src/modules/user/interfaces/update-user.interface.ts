import { UserRoles } from "../models";

export declare interface UpdateUserRequest {
    id: number,
    fullName: string,
    image?: string,
    experience?: string,
    email: string,
    phone?: string,
    role?: UserRoles,
    password: string
}