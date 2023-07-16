import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth.guard';
import { RolesGuard } from 'src/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('request')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAllRequest() {
    return this.usersService.findAllRequest();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get(':id/validate')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  validateUser(@Param('id') id: string) {
    return this.usersService.validateUser(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('update/me')
  @UseGuards(AuthGuard)
  @Roles('WEBMASTER', 'ADMIN')
  selfUpdate(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const { user } = req
    console.log(user)
    return this.usersService.update(user.sub, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
