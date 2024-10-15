import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { CreateFoodRequest } from "../interfaces/create-food.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodDto implements CreateFoodRequest {
    @ApiProperty({
        type: 'string',
        required: true,
        example: 'Cheese burger'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: 'number',
        required: true,
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    creator_id: number;

    @ApiProperty({
        type: 'number',
        required: true,
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @ApiProperty({
        type: "string",
        required: true,
        example: "1 kg guruch, 1 kg sabzi, 1 dona piyoz"
    })
    @IsString()
    @IsNotEmpty()
    receipt: string;

    @ApiProperty({
        type: 'string',
        required: true,
        example: "osh pishirish"
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: 'string',
        required: true,
        example: '2 soat'
    })
    @IsString()
    @IsNotEmpty()
    cooking_time: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: true,
    })
    video: Express.Multer.File;
}
