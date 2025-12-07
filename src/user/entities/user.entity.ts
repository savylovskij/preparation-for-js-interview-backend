import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'firebase_id', type: 'varchar', unique: true })
  firebaseId!: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: true })
  firstName!: string | null;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
  lastName!: string | null;

  @Column({ type: 'varchar', nullable: true })
  avatar!: string | null;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  provider!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt!: Date;
}
