import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async create(@Body() createCategoryPayload: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryPayload);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findCategoryById(+id);
  }

  @Patch(':categoryId')
  async update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() updateCategoryPayload: UpdateCategoryDto) {
    await this.categoryService.updateCategory({
      ...updateCategoryPayload,
      id: categoryId
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}
