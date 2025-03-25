import {
  Controller,
  Get,
  //   Post,
  //   Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('id')
  async findOne(@Param('id') id: string) {
    const menu = await this.menuService.findOne(id);
    if (!menu) {
      throw new NotFoundException(`Failed to find menu with id: ${id}`);
    }
    return menu;
  }
}
