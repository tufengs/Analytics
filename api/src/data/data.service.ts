import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class DataService {
  constructor(@InjectConnection() private connection: Connection) {}
  async create(createDatumDto: CreateDatumDto) {
    console.log(createDatumDto);
    // const dataModel = this.connection.model(Data.name);
    // const data = new dataModel(createDatumDto);
    // return data.save();
    return this.connection.model(Event.name).create(createDatumDto);
  }

  findAllByApp(app_id: string, app_secret: string) {
    return this.connection.model(Event.name).find({ app_id, app_secret });
  }

  findAll() {
    return this.connection.model(Event.name).find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} datum`;
  }

  update(id: number, updateDatumDto: UpdateDatumDto) {
    return `This action updates a #${id} datum`;
  }

  remove(id: number) {
    return `This action removes a #${id} datum`;
  }
}
