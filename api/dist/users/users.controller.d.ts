import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        password: string;
        role: string;
        company: string;
        baseUrl: string;
    }, unknown, never> & {}>;
    findAll(): string;
    findOne(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        password: string;
        role: string;
        company: string;
        baseUrl: string;
    }, unknown, never> & {}>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
