import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import 'reflect-metadata';
import { ProductTest } from 'src/product-tests/entities/product-test.entity';
@Entity('makeup')
export class Makeup {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  name: string;

  @Column('enum', {
    enum: ['Lipstick', 'Mascara', 'Foundation', 'Eyeliner', 'Eyeshadow'],
    nullable: false,
  })
  category: string;

  @Column('integer', { nullable: false })
  stock: number;

  @Column('text', { nullable: false })
  ware_house_location: string;

  @Column('integer', { nullable: false })
  durability_score: number;

  @OneToMany(() => ProductTest, (productTest) => productTest.product)
  tests: ProductTest[];
}
//creación de la tabla
