import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth.guard";
import {RolesGuard} from "../roles.guard";
import {Roles} from "../roles.decorator";
import {Dashboard_elementsService} from "./dashboard_elements.service";
import {CreateDashboardElementsDto} from "./dto/create-dashboard-elements-dto";

@Controller('dashboard_element')
@UseGuards(AuthGuard, RolesGuard)
@Roles('WEBMASTER')
export class Dashboard_elementsController {
    constructor(private readonly dashboardElementService: Dashboard_elementsService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    create(@Request() request, @Body() createDashboardElementDto: CreateDashboardElementsDto) {
        const {user} = request
        return this.dashboardElementService.create({ createDashboardDto: createDashboardElementDto, user_id: user.sub });
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    findAll(@Request() request) {
        const {user} = request
        return this.dashboardElementService.findAllDashboard(user.sub);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    findOne(@Param('id') id: string) {
        return this.dashboardElementService.findDashboard(id);
    }
}
