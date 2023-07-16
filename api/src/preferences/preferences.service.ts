import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PreferencesService {
  constructor(private prismaService: PrismaService) {}
  async create(createPreferenceDto: CreatePreferenceDto) {
    try {
      return this.prismaService.preference.create({
        // @ts-ignore
        data: {
          ...createPreferenceDto
        }
      })
    } catch (error) {
      throw new BadRequestException();
    } 
  }

  async findAll(userId: string) {
    try {
      return this.prismaService.preference.findMany({
        where: {
          userId
        }
      })
    } catch (error) {
      throw new BadRequestException();
    } 
  }

  findOne(id: number) {
    // NOT USEFULL
    return `This action returns a #${id} preference`;
  }

  update(id: number, updatePreferenceDto: UpdatePreferenceDto) {
    // NOT USEFULL
    return `This action updates a #${id} preference`;
  }

  remove(id: string) {
    try {
      return this.prismaService.preference.delete({
        where: {
          id
        }
      });
    } catch (error) {
      throw new BadRequestException();
    } 
  }
}
