import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Makeup } from '../../Products/makeup/entities/makeup.entity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders_transactions') // Nombre de la tabla en la BD.
export class OrdersTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrdersTransaction, (order) => order.client)
  orders: OrdersTransaction[];
  client: User; // Relación con el cliente que hizo la compra.

  @ManyToMany(() => Makeup, { cascade: true })
  @JoinTable()
  products: Makeup[]; // Productos comprados.

  @Column('numeric', { default: 0 })
  @Check('total_amount >= 0') // Evita valores negativos.
  total_amount: number; // Monto total de la orden.

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus; // Estado de la transacción.

  @CreateDateColumn()
  createdAt: Date; // Fecha de creación de la orden.

  @UpdateDateColumn()
  updatedAt: Date; // Última actualización de la orden.
}
