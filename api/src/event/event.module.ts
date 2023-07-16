import { Module } from '@nestjs/common';
import { DataService } from './event.service';
import { DataController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { EventSchema, Event } from './schemas/event.schema';
import { JwtService } from '@nestjs/jwt';
import { ApplicationsService } from 'src/applications/applications.service';
import { PrismaService } from 'src/prisma.service';
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
  providers: [JwtService, DataService, ApplicationsService, PrismaService],
})
export class DataModule { }
