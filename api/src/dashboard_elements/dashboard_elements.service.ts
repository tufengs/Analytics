import { Injectable } from '@nestjs/common';
import {AuthGuard} from "../auth.guard";
import {PrismaService} from "../prisma.service";
import {CreateDashboardElementsDto} from "./dto/create-dashboard-elements-dto";

@Injectable()
export class Dashboard_elementsService {
    constructor(private prismaService: PrismaService) {}

    async create(payload: {createDashboardDto: CreateDashboardElementsDto, user_id: string}) {
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

    async findAllDashboard(userId: string) {
        return this.prismaService.dashboard.findMany({
            where: {
                userId: userId
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
