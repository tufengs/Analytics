import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        company: createUserDto.company,
        baseUrl: createUserDto.baseUrl,
        password: await hash(createUserDto.password, 10),
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        company: true,
        baseUrl: true,
        KBIS: true,
        application: true,
      },
    });
    
    if (!user) {
      throw new NotFoundException();
    }
  
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
