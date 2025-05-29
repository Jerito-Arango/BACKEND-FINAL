import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductTestDto } from './dto/create-product-test.dto';
import { UpdateProductTestDto } from './dto/update-product-test.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTest } from './entities/product-test.entity';
@Injectable()
export class ProductTestsService {
  constructor(
    @InjectRepository(ProductTest)
    private readonly productTestsRepository: Repository<ProductTest>,
  ) {}

  async create(createProductTestDto: CreateProductTestDto) {
    const newProductTest = this.productTestsRepository.create({
      ...createProductTestDto,
      survival_status:
        createProductTestDto.survival_status !== undefined
          ? Boolean(createProductTestDto.survival_status)
          : undefined,
    });
    await this.productTestsRepository.save(newProductTest);
    return newProductTest;
  }

  async findAll(): Promise<ProductTest[]> {
    return this.productTestsRepository.find({});
  }

  async findOne(id: string): Promise<ProductTest> {
    const producttest = await this.productTestsRepository.findOneBy({ id });
    if (!producttest) {
      throw new NotFoundException('Not found');
    }
    return producttest;
  }

  async update(id: string, updateProductTestDto: UpdateProductTestDto) {
    const producttest = await this.productTestsRepository.preload({
      id: id,
      ...updateProductTestDto,
      survival_status:
        updateProductTestDto.survival_status !== undefined
          ? Boolean(updateProductTestDto.survival_status)
          : undefined,
    });
    if (!producttest) {
      throw new NotFoundException(`Product test with ID #${id} not found`);
    }
    await this.productTestsRepository.save(producttest);
    return producttest;
  }

  async remove(id: string): Promise<ProductTest> {
    const producttest = await this.findOne(id);
    await this.productTestsRepository.delete({ id: id });
    return producttest;
  }

  async getTesterTests(testerId: string): Promise<ProductTest[]> {
    return this.productTestsRepository.find({
      where: { tester: { id: testerId } },
      relations: ['product'],
    });
  }
}
