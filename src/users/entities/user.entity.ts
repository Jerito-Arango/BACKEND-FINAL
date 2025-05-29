import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { ProductTest } from '../../product-tests/entities/product-test.entity';
import { Makeup } from '../../Products/makeup/entities/makeup.entity';

export enum UserRole {
  ADMIN = 'Admin',
  CLIENT = 'Client',
  TESTER = 'Tester',
  EMPLOYEE = 'Employee',
}

@Entity('usuarios') // Nombre de la tabla en la base de datos.
export class User {
  @PrimaryGeneratedColumn('uuid') // Genera un ID único.
  id: string;

  @Column('text', { unique: true, nullable: false })
  name: string;

  @Column('text', { unique: true, nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
    nullable: false,
  })
  role: UserRole;

  @OneToMany(() => ProductTest, (test) => test.tester)
  tests: ProductTest[];

  @ManyToMany(() => Makeup, { cascade: true })
  @JoinTable()
  allergicProducts: Makeup[];

  @Column('simple-json', { nullable: true })
  purchase_history?: { productId: string; date: string; quantity: number }[]; // Historial de compras en formato JSON.

  @Column('boolean', { default: false })
  test_subject_status: boolean; // Si es sujeto de prueba o no.

  @Column('text', { nullable: true })
  allergic_reactions: string;

  @CreateDateColumn()
  createdAt: Date;
}
