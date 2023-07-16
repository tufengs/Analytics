import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {CredentialsService} from "./credentials.service";
import {CredentialsController} from "./credentials.controller";
@Module({
    controllers: [CredentialsController],
    providers: [CredentialsService, JwtService, PrismaService],
})
export class CredentialsModule {}
