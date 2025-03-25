import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { clerkId: createUserDto.clerkId },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or clerkId already exists',
      );
    }

    const user = this.userRepository.create({
      ...createUserDto,
    });

    return this.userRepository.save(user);
  }

  async findAll(role?: UserRole): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');

    if (role) {
      query.where('user.role = :role', { role });
    }

    return query.getMany();
  }

  async findAllChefs(): Promise<User[]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: UserRole.CHEF })
      .leftJoinAndSelect('user.menu', 'menu');

    return query.getMany();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['menu'],
    });
  }

  async findByClerkId(clerkId: string): Promise<User> {
    return this.userRepository.findOne({
      where: { clerkId },
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
