import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdersTransactionDto } from './dto/create-orders-transaction.dto';
import { UpdateOrdersTransactionDto } from './dto/update-orders-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersTransaction } from './entities/orders-transaction.entity';

@Injectable()
export class OrdersTransactionsService {
  constructor(
    @InjectRepository(OrdersTransaction)
    private readonly OrdersTransactionsRepository: Repository<OrdersTransaction>,
  ) {}
  async create(createOrdersTransactionDto: CreateOrdersTransactionDto) {
    const products = createOrdersTransactionDto.products.map((productId) => ({
      id: productId,
    }));
    const newUser = this.OrdersTransactionsRepository.create({
      ...createOrdersTransactionDto,
      products,
    });
    await this.OrdersTransactionsRepository.save(newUser);
    return newUser;
  }

  findAll() {
    const orderstransaction = this.OrdersTransactionsRepository.find({});
    return orderstransaction;
  }

  async findOne(id: string) {
    const orderstransaction = await this.OrdersTransactionsRepository.findOneBy(
      { id: id },
    );
    if (!orderstransaction) {
      throw new NotFoundException('Not found');
    }
    return orderstransaction;
  }

  async update(
    id: string,
    updateOrdersTransactionDto: UpdateOrdersTransactionDto,
  ) {
    const products = updateOrdersTransactionDto.products?.map((productId) => ({
      id: productId,
    }));
    const user = await this.OrdersTransactionsRepository.preload({
      id: id,
      ...updateOrdersTransactionDto,
      products,
    });
    if (!user) {
      throw new NotFoundException('User #${id} not found');
    }
    await this.OrdersTransactionsRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.OrdersTransactionsRepository.delete({ id: id });
    return user;
  }
}
