import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCommonDto } from 'src/common/dto/create-common.dto';
import { UpdateCommonDTO } from 'src/common/dto/update-common.dto';
import { PaginationDTO } from 'src/common/dto/paginationDto';
import { CommonEntity } from 'src/common/entities/common.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(CommonEntity)
    private readonly commonRepository: Repository<CommonEntity>,
  ) {}

  async create(createCommonDto: createCommonDto) {
    const newEntity = this.commonRepository.create(createCommonDto);
    return await this.commonRepository.save(newEntity);
  }

  async findAll(paginationDTO: PaginationDTO) {
    const { limit = 10, offset = 0 } = paginationDTO;
    const [data, total] = await this.commonRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      total,
      limit,
      offset,
      data,
    };
  }

  async findOne(id: string) {
    return await this.commonRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCommonDto: UpdateCommonDTO) {
    await this.commonRepository.update(id, updateCommonDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.commonRepository.delete(id);
    return { message: `Entity with ID ${id} has been removed` };
  }
}
