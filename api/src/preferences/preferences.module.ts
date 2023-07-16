import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [PreferencesController],
  providers: [PreferencesService, JwtService, PrismaService]
})
export class PreferencesModule {}
