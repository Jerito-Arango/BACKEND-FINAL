import { Module } from '@nestjs/common';
import { OrdersTransactionsService } from './orders-transactions.service';
import { OrdersTransactionsController } from './orders-transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersTransaction } from './entities/orders-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersTransaction])],
  providers: [OrdersTransactionsService],
  controllers: [OrdersTransactionsController],
  exports: [TypeOrmModule],
})
export class OrdersTransactionsModule {}
