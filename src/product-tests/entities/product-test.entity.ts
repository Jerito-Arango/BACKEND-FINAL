import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Makeup } from '../../Products/makeup/entities/makeup.entity'; // Corrected relative path to MakeupProduct

@Entity('product_tests') // Nombre de la tabla en la base de datos.
export class ProductTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tests, { onDelete: 'CASCADE' })
  tester: User; // Se relaciona con la entidad `User` (tester)

  @ManyToOne(() => Makeup, (makeup) => makeup.tests, { onDelete: 'CASCADE' })
  product: Makeup; // Se relaciona con `MakeupProduct`

  @Column({ type: 'text', nullable: true })
  reaction: string; // Observaciones sobre la reacción del producto.

  @Column({ type: 'int', default: 5 })
  rating: number; // Puntuación del producto (1-10).

  @Column({ type: 'boolean', default: true })
  survival_status: boolean; // ¿El tester sobrevivió a la prueba? 😆
}
