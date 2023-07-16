import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class DataService {
  constructor(@InjectConnection() private connection: Connection) {}
  
  async create(createDatumDto: CreateDatumDto) {
    return this.connection.model(Event.name).create(createDatumDto);
  }

  findAllByApp(app_id: string) {
    return this.connection.model(Event.name).find({ app_id });
  }

  findAll() {
    return this.connection.model(Event.name).find({});
  }

  findOne(app_id: string, id: number) {
    return this.connection
      .model(Event.name)
      .find({ app_id, _id: id });
  }

  update(id: string, updateDatumDto: UpdateDatumDto) {
    throw new NotImplementedException()
  }

  remove(id: number) {
    throw new NotImplementedException()
  }
}
