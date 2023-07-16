import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
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
      // @ts-ignore
      data: {
        email: createUserDto.email,
        company: createUserDto.company,
        baseUrl: createUserDto.baseUrl,
        password: await hash(createUserDto.password, 10),
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      where: {
        role: "WEBMASTER",
        validated: true
      }
    })
  }

  findAllRequest() {
    return this.prismaService.user.findMany({
      where: {
        validated: false,
        role: "WEBMASTER"
      }
    })
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        company: true,
        baseUrl: true,
        KBIS: true,
        application: true,
      },
    });
    
    if (!user) {
      throw new BadRequestException();
    }
  
    return user;
  }

  async findOneByEmail(email: string) {
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
      throw new BadRequestException();
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async validateUser(id: string): Promise<any> {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        validated: true
      },
      include: {
        application: true
      }
    });

    const application = await this.prismaService.application.create({
      // @ts-ignore
      data: {
        userId: id
      }
    })

    return user
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
