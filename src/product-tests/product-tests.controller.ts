import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { CreateProductTestDto } from './dto/create-product-test.dto';
import { UpdateProductTestDto } from './dto/update-product-test.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-tests')
@UseGuards(AuthGuard('jwt')) // Protege los endpoints con autenticación
export class ProductTestsController {
  constructor(private readonly productTestsService: ProductTestsService) {}

  @Post()
  async create(@Body() createProductTestDto: CreateProductTestDto) {
    return await this.productTestsService.create(createProductTestDto);
  }

  @Get()
  async findAll() {
    return await this.productTestsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const test = await this.productTestsService.findOne(id);
    if (!test) {
      throw new NotFoundException(`No se encontró la prueba con ID ${id}`);
    }
    return test;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductTestDto: UpdateProductTestDto,
  ) {
    const updatedTest = await this.productTestsService.update(
      id,
      updateProductTestDto,
    );
    if (!updatedTest) {
      throw new NotFoundException(
        `No se pudo actualizar la prueba con ID ${id}`,
      );
    }
    return updatedTest;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.productTestsService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar la prueba con ID ${id}`);
    }
    return { message: 'Prueba eliminada exitosamente' };
  }
}
