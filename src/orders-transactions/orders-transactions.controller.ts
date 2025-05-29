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
import { OrdersTransactionsService } from './orders-transactions.service';
import { CreateOrdersTransactionDto } from './dto/create-orders-transaction.dto';
import { UpdateOrdersTransactionDto } from './dto/update-orders-transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders-transactions')
@UseGuards(AuthGuard('jwt')) // Protege todos los endpoints con autenticación
export class OrdersTransactionsController {
  constructor(
    private readonly ordersTransactionsService: OrdersTransactionsService,
  ) {}

  @Post()
  async create(@Body() createOrdersTransactionDto: CreateOrdersTransactionDto) {
    return await this.ordersTransactionsService.create(
      createOrdersTransactionDto,
    );
  }

  @Get()
  async findAll() {
    return await this.ordersTransactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersTransactionsService.findOne(id);
    if (!order) {
      throw new NotFoundException(`No se encontró la orden con ID ${id}`);
    }
    return order;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrdersTransactionDto: UpdateOrdersTransactionDto,
  ) {
    const updatedOrder = await this.ordersTransactionsService.update(
      id,
      updateOrdersTransactionDto,
    );
    if (!updatedOrder) {
      throw new NotFoundException(
        `No se pudo actualizar la orden con ID ${id}`,
      );
    }
    return updatedOrder;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.ordersTransactionsService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar la orden con ID ${id}`);
    }
    return { message: 'Orden eliminada exitosamente' };
  }
}
