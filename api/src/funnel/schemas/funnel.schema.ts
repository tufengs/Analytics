import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Tag } from 'src/tag/schemas/tag.schema';

export type FunnelDocument = HydratedDocument<Funnel>;

@Schema()
export class Funnel {
  @Prop()
  name: string;

  @Prop()
  app_id: string;

  @Prop()
  tags: Tag[];
}

export const FunnelSchema = SchemaFactory.createForClass(Funnel);
