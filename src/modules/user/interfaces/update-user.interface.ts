import { UserRoles } from "../models";

export declare interface UpdateUserRequest {
    id: number,
    fullName: string,
    image?: Express.Multer.File,
    experience?: string,
    email: string,
    phone?: string,
    role?: UserRoles,
    password: string
}