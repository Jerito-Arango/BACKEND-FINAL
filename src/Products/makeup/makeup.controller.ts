import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MakeupService } from './makeup.service';
import { CreateMakeupDto } from './dto/create-makeup.dto';
import { UpdateMakeupDto } from './dto/update-makeup.dto';
import { PaginationDTO } from 'src/common/dto/paginationDto';

@Controller('makeup')
export class MakeupController {
  constructor(private readonly makeupService: MakeupService) {}

  @Post()
  create(@Body() createMakeupDto: CreateMakeupDto) {
    return this.makeupService.create(createMakeupDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO) {
    return this.makeupService.findAll(paginationDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.makeupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMakeupDto: UpdateMakeupDto) {
    return this.makeupService.update(id, updateMakeupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.makeupService.remove(id);
  }
}
