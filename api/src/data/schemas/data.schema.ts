import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  name: string;

  @Prop()
  APP_ID: number;

  @Prop()
  VISITOR_ID: string;

  @Prop()
  SESSION_ID: string;
}

export const DataSchema = SchemaFactory.createForClass(Data);
