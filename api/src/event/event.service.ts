import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class DataService {
  constructor(@InjectConnection() private connection: Connection) { }

  async create(createDatumDto: CreateDatumDto) {
    const t = this.connection.model(Event.name).create(createDatumDto);
    return t;
  }

  findAllByApp(app_id: string) {
    return this.connection.model(Event.name).find({ app_id });
  }

  appStat(app_id: string) {
    const sessionsNumber = this.connection.model(Event.name).find({ app_id }).count();

    return {
      sessionsNumber,
    }
  }

  findEventsByTag(app_id: string, tag: string) {
    return this.connection.model(Event.name).find(
      {
        app_id,
        tag
      }
    );
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
