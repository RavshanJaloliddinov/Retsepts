export class CreateAuthDto {}
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { LoginRequest } from "../interfaces";

export class LoginDto implements LoginRequest {
    @ApiProperty({
        type: "string",
        required: true,
        example: "john_old@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        type: "string",
        required: true,
        example: "+998904794006",
        maxLength: 13,
        minLength: 13,
    })
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;
}