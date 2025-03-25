import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

export enum UserRole {
  USER = 'user',
  CHEF = 'chef',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true }) email: string;

  @Column() firstName: string;

  @Column() lastName: string;

  @Column({ nullable: false }) phoneNumber: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true }) profilePicture: string;

  @Column({ nullable: false }) address: string;

  @Column({ nullable: false }) zip: string;

  @Column({ nullable: false }) city: string;

  @Column({ nullable: false }) state: string;

  @Column({ default: false })
  hasRequestedChefRole: boolean;

  @Column({ nullable: true })
  chefApplicationDate: Date;

  @Column({ nullable: true })
  chefApplicationStatus: string;

  @OneToOne(() => Menu, (menu) => menu.chef)
  menu: Menu;

  @Column({ nullable: true })
  stripeCustomerId: string;

  @Column({ nullable: true })
  stripeAccountId: string;

  @Column({ unique: true })
  clerkId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
