import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  app_id: string;

  @Prop()
  visitor_id: string;

  @Prop()
  session_id: string;

  @Prop()
  event: string;

  @Prop()
  tag: string;

  @Prop()
  host: string;

  @Prop()
  path: string;

  @Prop({ type: Object })
  data: object;

  @Prop()
  timestamp: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
