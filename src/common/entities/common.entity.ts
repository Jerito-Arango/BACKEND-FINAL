import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('common')
export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
