import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { MenuItem } from './menu-item.entity';

export enum MenuStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() title: string;

  @Column({ nullable: true }) menuImageUrl: string;

  @Column({ unique: true }) chefId: string;

  @OneToOne(() => User, (user) => user.menu)
  @JoinColumn({ name: 'chefId' })
  chef: User;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menu, { cascade: true })
  menuItems: MenuItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
