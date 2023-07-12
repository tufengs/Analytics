import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(email: any, pass: any): Promise<{
        access_token: string;
    }>;
    signUp({ email, password, company, baseUrl }: {
        email: any;
        password: any;
        company: any;
        baseUrl: any;
    }): Promise<User>;
}
