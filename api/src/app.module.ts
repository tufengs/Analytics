import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigService, ConfigModule } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DataModule } from './data/data.module';
import { Data, DataSchema } from './data/schemas/data.schema';
import { DataService } from './data/data.service';
import { DataController } from './data/data.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'data', schema: DataSchema }]),
    UsersModule,
    AuthModule,
    JwtModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService, ConfigService],
})
export class AppModule {}
