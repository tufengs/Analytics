import { Injectable } from '@nestjs/common';
import {AuthGuard} from "../auth.guard";
import {PrismaService} from "../prisma.service";
import {CreateDashboardElementsDto} from "./dto/create-dashboard-elements-dto";

@Injectable()
export class Dashboard_elementsService {
    constructor(private prismaService: PrismaService) {}

    async create(payload: {createDashboardDto: CreateDashboardElementsDto}) {
        return this.prismaService.dashboardElement.create({
            data: {
                dashboardId: payload.createDashboardDto.dashboardId,
                dashboardType: payload.createDashboardDto.dashboardType,
                position: payload.createDashboardDto.position,
                height: payload.createDashboardDto.height,
                width: payload.createDashboardDto.width,
            }
        })
    }

    async remove(id: string) {
        return this.prismaService.dashboardElement.delete({
            where: {
                id
            }
        })
    }

    async findDashboardElements(dashboardId: string) {
        return this.prismaService.dashboardElement.findMany({
            where: {
                dashboardId: dashboardId
            }
        })
    }
}
