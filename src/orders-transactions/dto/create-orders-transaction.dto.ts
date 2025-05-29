import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';

// Enum para payment_status
export enum PaymentStatus {
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  FAILED = 'Failed',
}

export class CreateOrdersTransactionDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly client_id: string;

  @IsArray()
  @IsString({ each: true }) // Valida que cada elemento del array sea string
  readonly products: string[];

  @IsNumber()
  readonly total_amount: number;

  @IsEnum(PaymentStatus) // Enum para controlar los valores válidos
  readonly payment_status: PaymentStatus;
}
