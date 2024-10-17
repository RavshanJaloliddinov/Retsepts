import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from 'src/decarators';
import { UserRoles } from '../user';



@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // Create category
  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  async create(@Body() createCategoryPayload: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryPayload);
  }

  // Get all category
  @Protected(true)
  @Roles([UserRoles.admin])
  @Get()
  async findAll() {
    return this.categoryService.findAllCategories();
  }

  // Get category by id
  @Protected(true)
  @Roles([UserRoles.admin])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findCategoryById(+id);
  }

  // Update category
  @Protected(true)
  @Roles([UserRoles.admin])
  @Patch(':categoryId')
  async update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() updateCategoryPayload: UpdateCategoryDto) {
    await this.categoryService.updateCategory({
      ...updateCategoryPayload,
      id: categoryId
    });
  }

  // Delete category
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}
