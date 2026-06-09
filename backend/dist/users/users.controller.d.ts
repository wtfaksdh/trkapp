import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import("./entities/user.entity").User[];
    findOne(id: string): import("./entities/user.entity").User;
    create(dto: CreateUserDto): import("./entities/user.entity").User;
}
