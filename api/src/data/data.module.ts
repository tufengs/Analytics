import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { EventSchema, Event } from './schemas/event.schema';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Event.name,
        useFactory: () => {
          const schema = EventSchema;
          schema.pre('save', function () {
            console.log('Hello from pre save');
          });
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
