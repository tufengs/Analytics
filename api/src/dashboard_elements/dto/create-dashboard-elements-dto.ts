import {DashboardType} from "@prisma/client";

export class CreateDashboardElementsDto {
    dashboardId: string
    dashboardType: DashboardType
    position: number
    height: number
    width: number
}
