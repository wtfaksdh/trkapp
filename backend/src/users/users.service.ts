import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`Пользователь ${id} не найден`);
    return user;
  }

  create(dto: CreateUserDto): User {
    const exists = this.users.find(u => u.email === dto.email);
    if (exists) throw new ConflictException('Email уже используется');

    const user: User = { id: uuidv4(), ...dto };
    this.users.push(user);
    return user;
  }
}