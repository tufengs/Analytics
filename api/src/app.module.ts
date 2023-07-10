import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigService, ConfigModule } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService, ConfigService],
})
export class AppModule {}
