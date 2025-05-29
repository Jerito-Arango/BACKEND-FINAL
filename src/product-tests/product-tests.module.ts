import { Module } from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { ProductTestsController } from './product-tests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTest } from './entities/product-test.entity';

@Module({
  controllers: [ProductTestsController],
  providers: [ProductTestsService],
  imports: [TypeOrmModule.forFeature([ProductTest])],
  exports: [TypeOrmModule],
})
export class ProductTestsModule {}
