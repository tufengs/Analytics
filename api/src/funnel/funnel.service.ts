import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateFunnelDto } from './dto/create-funnel.dto';
import { UpdateFunnelDto } from './dto/update-funnel.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Funnel } from './schemas/funnel.schema';
@Injectable()
export class FunnelService {
  constructor(@InjectConnection() private connection: Connection) {}
  
  create(createFunnelDto: CreateFunnelDto) {
    return this.connection.model(Funnel.name).create(createFunnelDto);
  }

  findAll(app_id: string) {
    return this.connection.model(Funnel.name).find({ app_id });
  }

  findOne(id: string) {
    throw new NotImplementedException();
  }

  update(app_id: string, id: string, updateFunnelDto: UpdateFunnelDto) {
    return this.connection.model(Funnel.name).updateOne({ app_id, _id: id }, updateFunnelDto)
  }

  remove(id: string) {
    throw new NotImplementedException();
  }
}
