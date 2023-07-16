import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {DashboardController} from "./dashboard.controller";
import {DashboardService} from "./dashboard.service";
@Module({
    controllers: [DashboardController],
    providers: [DashboardService, JwtService, PrismaService],
})
export class DashboardModule {}
