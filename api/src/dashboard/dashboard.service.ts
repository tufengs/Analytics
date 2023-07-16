import { Injectable } from '@nestjs/common';
import {AuthGuard} from "../auth.guard";
import {PrismaService} from "../prisma.service";
import {CreateDashboardDto} from "./dto/create-dashboard-dto";

@Injectable()
export class DashboardService {
    constructor(private prismaService: PrismaService) {}

    async create(payload: {createDashboardDto: CreateDashboardDto, user_id: string}) {
        return this.prismaService.dashboard.create({
            data: {
                userId: payload.user_id,
                title: payload.createDashboardDto.title,
            }
        })
    }

    async remove(id: string) {
        return this.prismaService.dashboard.delete({
            where: {
                id
            }
        })
    }

    async findAllDashboard(id: string) {
        return this.prismaService.dashboard.findMany({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
            }
        })
    }

    async findDashboard(id: string) {
        return this.prismaService.dashboard.findMany({
            where: {
                id: id
            },
            include: {
                dashboard_elements: true
            }
        })
    }
}
