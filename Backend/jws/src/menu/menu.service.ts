import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async findOne(id: string): Promise<Menu | null> {
    return this.menuRepository.findOne({
      where: { id },
      relations: ['menuItems', 'chef'],
    });
  }
}
