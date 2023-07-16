import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigService, ConfigModule } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DataModule } from './event/event.module';
import { ApplicationsModule } from './applications/applications.module';
import { CredentialsController } from './credentials/credentials.controller';
import { CredentialsService } from './credentials/credentials.service';
import { CredentialsModule } from './credentials/credentials.module';
import { TagModule } from './tag/tag.module';
import { PreferencesModule } from './preferences/preferences.module';
import { FunnelModule } from './funnel/funnel.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    JwtModule,
    DataModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
        dbName: 'db',
      }),
      inject: [ConfigService],
    }),
    ApplicationsModule,
    CredentialsModule,
    TagModule,
    PreferencesModule,
    FunnelModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ConfigService],
})
export class AppModule {}
