import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMakeupDto } from './dto/create-makeup.dto';
import { UpdateMakeupDto } from './dto/update-makeup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Makeup } from './entities/makeup.entity';
import { Repository } from 'typeorm';
import { PaginationDTO } from 'src/common/dto/paginationDto';

@Injectable()
export class MakeupService {
  constructor(
    @InjectRepository(Makeup)
    private readonly makeupRepository: Repository<Makeup>,
  ) {}

  async create(createMakeupDto: CreateMakeupDto) {
    try {
      const newMakeup = this.makeupRepository.create(createMakeupDto);
      await this.makeupRepository.save(newMakeup);
      return newMakeup;
    } catch (e) {
      console.error('Error creating makeup:', e);
      throw new Error('Could not create makeup product');
    }
  }

  async findAll(paginationDTO: PaginationDTO = { limit: 10, offset: 0 }) {
    const { limit, offset } = paginationDTO;
    const [makeups, total] = await this.makeupRepository
      .createQueryBuilder('makeup')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
    return {
      total,
      limit,
      offset,
      data: makeups,
    };
  }

  async findOne(id: string) {
    const makeup = await this.makeupRepository.findOne({ where: { id } });
    if (!makeup) {
      throw new NotFoundException(`Makeup with ID ${id} not found`);
    }
    return makeup;
  }

  async update(id: string, updateMakeupDto: UpdateMakeupDto) {
    const makeup = await this.makeupRepository.preload({
      id,
      ...updateMakeupDto,
    });
    if (!makeup) {
      throw new NotFoundException(`Makeup with ID ${id} not found`);
    }
    await this.makeupRepository.save(makeup);
    return makeup;
  }

  async remove(id: string) {
    const makeup = await this.findOne(id);
    await this.makeupRepository.delete({ id });
    return {
      message: `Makeup with ID ${id} was deleted`,
      deleted: makeup,
    };
  }
}