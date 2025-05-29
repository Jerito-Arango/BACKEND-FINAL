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
import { CommonService } from './common.service';
import { createCommonDto } from './dto/create-common.dto';
import { UpdateCommonDTO } from 'src/common/dto/update-common.dto';
import { PaginationDTO } from 'src/common/dto/paginationDto';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post()
  create(@Body() createCommonDto: createCommonDto) {
    return this.commonService.create(createCommonDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO) {
    return this.commonService.findAll(paginationDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommonDto: UpdateCommonDTO) {
    return this.commonService.update(id, updateCommonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonService.remove(id);
  }
}
