import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {Dashboard_elementsController} from "./dashboard_elements.controller";
import {Dashboard_elementsService} from "./dashboard_elements.service";
@Module({
    controllers: [Dashboard_elementsController],
    providers: [Dashboard_elementsService, JwtService, PrismaService],
})
export class Dashboard_elementsModule {}
