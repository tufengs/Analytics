import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth.guard";
import {RolesGuard} from "../roles.guard";
import {Roles} from "../roles.decorator";
import {DashboardService} from "./dashboard.service";
import {CreateDashboardDto} from "./dto/create-dashboard-dto";

@Controller('dashboard')
@UseGuards(AuthGuard, RolesGuard)
@Roles('WEBMASTER')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    create(@Request() request, @Body() createDashboardDto: CreateDashboardDto) {
        const {user} = request
        return this.dashboardService.create({ createDashboardDto: createDashboardDto, user_id: user.sub });
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    findAll(@Request() request, @Body() createDashboardDto: CreateDashboardDto) {
        const {user} = request
        return this.dashboardService.create({ createDashboardDto: createDashboardDto, user_id: user.sub });
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    findOne(@Request() request, @Body() createDashboardDto: CreateDashboardDto) {
        const {user} = request
        return this.dashboardService.create({ createDashboardDto: createDashboardDto, user_id: user.sub });
    }
}
