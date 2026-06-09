import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private users;
    findAll(): User[];
    findOne(id: string): User;
    create(dto: CreateUserDto): User;
}
