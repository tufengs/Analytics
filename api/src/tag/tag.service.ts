import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    try {
      return await this.prismaService.tag.create({
        // @ts-ignore
        data: {
          ...createTagDto
        }
      })
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(app_id: string) {
    try {
      return await this.prismaService.tag.findMany({
        where: {
          applicationId: app_id
        }
      })
    } catch (error) {
      throw new BadRequestException(error);
    }  
  }

  async findOne(app_id: string, id: string) {
    try {
      return await this.prismaService.tag.findFirst({
        where: {
          applicationId: app_id,
          id
        }
      })
    } catch (error) {
      throw new BadRequestException(error);
    }    
  }

  async update(app_id: string, id: string, updateTagDto: UpdateTagDto) {
    try {
      return await this.prismaService.tag.update({
        where: {
          applicationId: app_id,
          id
        },
        data: {
          ...updateTagDto
        }
      })
    } catch (error) {
      throw new BadRequestException(error);
    }  
  }

  async remove(app_id: string, id: string) {
    try {
      return await this.prismaService.tag.delete({
        where: {
          applicationId: app_id,
          id
        },
      })
    } catch (error) {
      throw new BadRequestException(error);
    }  
  }
}
