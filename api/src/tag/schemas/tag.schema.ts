import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop()
  name: string;

  @Prop()
  app_id: string;

  @Prop()
  comment: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
