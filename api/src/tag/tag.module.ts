import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [TagController],
  providers: [TagService, JwtService, PrismaService]
})
export class TagModule {}
