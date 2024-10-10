import { UserRoles } from "../models";

export declare interface CreateUserRequest {
    fullName: string,
    image?: string,
    experience?: string,
    email: string,
    phone?: string,
    role?: UserRoles
}