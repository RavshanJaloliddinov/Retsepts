import {
    IsDate, 
    IsNotEmpty, 
    IsString, 
    IsEmail, 
    IsPhoneNumber, 
    IsEnum, 
    IsOptional,
} from "class-validator"
import { UserRoles } from "../models"


export class CreateUserDto implements CreateUserDto {

    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsOptional()
    image?: string

    @IsDate()
    experience?: string

    @IsEmail()
    @IsNotEmpty()
    email: string


    @IsOptional()
    @IsPhoneNumber('UZ')
    phone?: string

    @IsOptional()
    @IsEnum(UserRoles)
    role?: UserRoles

    @IsString()
    @IsNotEmpty()
    password: string
}
