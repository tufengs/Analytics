import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './schemas/data.schema';

@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name, 'data') private dataModel: Model<Data>) {}
  create(createDatumDto: CreateDatumDto) {
    return this.dataModel.find();
  }

  findAll() {
    return this.dataModel.find();
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
