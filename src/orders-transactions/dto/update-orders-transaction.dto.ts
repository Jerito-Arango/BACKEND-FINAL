import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersTransactionDto } from './create-orders-transaction.dto';

export class UpdateOrdersTransactionDto extends PartialType(
  CreateOrdersTransactionDto,
) {}
