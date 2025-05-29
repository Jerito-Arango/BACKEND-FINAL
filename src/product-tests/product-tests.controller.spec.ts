import { Test, TestingModule } from '@nestjs/testing';
import { ProductTestsController } from './product-tests.controller';
import { ProductTestsService } from './product-tests.service';

describe('ProductTestsController', () => {
  let controller: ProductTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTestsController],
      providers: [ProductTestsService],
    }).compile();

    controller = module.get<ProductTestsController>(ProductTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
