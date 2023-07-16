import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schemas/tag.schema';
import { ConfigService } from '@nestjs/config';
import { Tag } from './schemas/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tag.name,
        useFactory: () => {
          const schema = TagSchema;
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TagController],
  providers: [TagService, JwtService]
})
export class TagModule { }
