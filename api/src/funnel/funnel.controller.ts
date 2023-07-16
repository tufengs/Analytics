import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards } from '@nestjs/common';
import { FunnelService } from './funnel.service';
import { CreateFunnelDto } from './dto/create-funnel.dto';
import { UpdateFunnelDto } from './dto/update-funnel.dto';
import { AuthGuard } from 'src/auth.guard';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('funnel')
@UseGuards(AuthGuard, RolesGuard)
export class FunnelController {
  constructor(private readonly funnelService: FunnelService) {}

  @Post()
  @Roles('WEBMASTER')
  create(@Headers() headers, @Body() createFunnelDto: CreateFunnelDto) {
    const app_id = headers['app-id'];
    return this.funnelService.create({ ...createFunnelDto, app_id });
  }

  @Get()
  @Roles('WEBMASTER')
  findAll(@Headers() headers) {
    const app_id = headers['app-id'];
    return this.funnelService.findAll(app_id);
  }

  @Get(':id')
  @Roles('WEBMASTER')
  findOne(@Param('id') id: string) {
    return this.funnelService.findOne(id);
  }

  @Patch(':id')
  @Roles('WEBMASTER')
  update(@Headers() headers, @Param('id') id: string, @Body() updateFunnelDto: UpdateFunnelDto) {
    const app_id = headers['app-id'];
    return this.funnelService.update(app_id, id, updateFunnelDto);
  }

  @Delete(':id')
  @Roles('WEBMASTER')
  remove(@Param('id') id: string) {
    return this.funnelService.remove(id);
  }
}
