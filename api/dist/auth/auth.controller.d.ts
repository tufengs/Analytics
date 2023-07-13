import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
    signUp(signUpDto: Record<string, any>): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        password: string;
        role: string;
        company: string;
        baseUrl: string;
    }, unknown, never> & {}>;
    getProfile(req: any): any;
}
