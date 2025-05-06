import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  // InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly manager: EntityManager;

  @InjectRepository(User)
  private readonly userRepository: typeof User;

  // @InjectDataSource()
  // private readonly dataSource: DataSource;

  async create(createUserDto: CreateUserDto) {
    // await this.manager.save(User, createUserDto);
    await this.manager.getRepository(User).save(createUserDto);
  }

  findAll() {
    return this.manager.find(User);
  }

  findOne(id: number) {
    return this.manager.findOne(User, {
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.manager.update(User, id, {
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    await this.manager.delete(User, id);
  }
}
