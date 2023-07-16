import { Module } from '@nestjs/common';
import { FunnelService } from './funnel.service';
import { FunnelController } from './funnel.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { FunnelSchema, Funnel } from './schemas/funnel.schema';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Funnel.name,
        useFactory: () => {
          const schema = FunnelSchema;
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [FunnelController],
  providers: [FunnelService, JwtService]
})
export class FunnelModule { }
