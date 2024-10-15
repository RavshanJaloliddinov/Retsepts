import {
    IsDate,
    IsNotEmpty,
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsEnum,
    IsOptional,
    isIn,
    IsIn,
} from "class-validator"
import { UserRoles } from "../models"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"


export class CreateUserDto implements Omit<CreateUserDto, 'image'> {

    @ApiProperty({
        type: String,
        example: "John Doe",
        description: 'full name kiritilishi shart',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    fullName: string

    @ApiProperty({
        type: String,
        format: 'binary',
        required: true,
    })
    image?: any

    @ApiProperty({
        type: String,
        example: "12-12-2023",
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    experience?: Date;

    @ApiProperty({
        type: String,
        example: "jaloliddinov008@gmail.com",
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        type: String,
        example: "+998904794006",
    })
    @IsOptional()
    @IsPhoneNumber('UZ')
    phone?: string

    @ApiProperty({
        type: String,
        example: "user",
        required: false
    })
    @IsOptional()
    @IsIn(['user', 'admin'])
    role?: UserRoles

    @ApiProperty({
        type: String,
        example: "Password007",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
