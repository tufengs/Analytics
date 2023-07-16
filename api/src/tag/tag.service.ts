import { BadRequestException, Injectable, NotImplementedException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Tag } from './schemas/tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectConnection() private connection: Connection) {}

  async create(createTagDto: CreateTagDto) {
    try {
      return this.connection.model(Tag.name).create(createTagDto)
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(app_id: string) {
    try {
      return this.connection.model(Tag.name).find({ app_id });
    } catch (error) {
      throw new BadRequestException(error);
    }  
  }

  async findOne(app_id: string, id: string) {
    throw new NotImplementedException()
  }

  async update(app_id: string, id: string, updateTagDto: UpdateTagDto) {
    try {
      return this.connection.model(Tag.name).updateOne({ app_id, _id: id }, updateTagDto)
    } catch (error) {
      throw new BadRequestException(error);
    }  
  }

  async remove(app_id: string, id: string) {
    throw new NotImplementedException();
  }
}
