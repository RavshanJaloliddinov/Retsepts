import { UpdateCategoryRequest } from '../interfaces';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto implements Omit<UpdateCategoryRequest, 'id'>{
    @ApiProperty({
        example: 'Milly taomlar',
        required: true,
        description: 'Cateogry update name'
    })
    @IsString()
    @IsNotEmpty()
    name: string
}
