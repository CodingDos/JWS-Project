import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Menu } from './menu.entity';

export enum MenuItemType {
  APPETIZER = 'appetizer',
  MAIN = 'main',
  SIDE = 'side',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
}

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'enum', enum: MenuItemType })
  type: MenuItemType;

  @Column({ default: 0 })
  price: number;

  @ManyToOne(() => Menu, (menu) => menu.menuItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuId' })
  menu: Menu;

  @Column()
  menuId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
