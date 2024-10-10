import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";
import { CreateFoodRequest } from "../interfaces/create-food.interface";

export class CreateFoodDto implements CreateFoodRequest {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsNumber()
    @IsNotEmpty()
    creator_id: number

    @IsNumber()
    @IsNotEmpty()
    category_id: number

    @IsString()
    @IsNotEmpty()
    receipt: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    cooking_time: string

    @IsString()
    @IsNotEmpty()
    video: string

    @IsBoolean()
    @IsNotEmpty()
    is_passed: boolean

    @IsDecimal()
    @IsNotEmpty()
    @Min(0) 
    @Max(5)
    rating: string
}
