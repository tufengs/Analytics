import {
  Body,
  Get,
  Request,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards, Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../auth.guard';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: any) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  signUp(@Body() signUpDto: any) {
    return this.authService.signUp({
      email: signUpDto.email,
      password: signUpDto.password,
      company: signUpDto.company,
      baseUrl: signUpDto.baseUrl,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('WEBMASTER', 'ADMIN')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('WEBMASTER', 'ADMIN')
  @Get('impersonate/:id')
  impersonate(@Param('id') id: string) {
    return this.authService.impersonate(id);
  }
}
