import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards
} from '@nestjs/common';
import { DataService } from './event.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { AuthGuard } from 'src/auth.guard';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { SecretGuard } from 'src/secret.guard';

@Controller('api/events')
export class DataController {
  constructor(private readonly dataService: DataService) { }

  @Post()
  @UseGuards(SecretGuard)
  create(@Headers() headers, @Body() createDatumDto: CreateDatumDto) {
    const app_id = headers['app-id'];
    createDatumDto = { ...createDatumDto, app_id };
    return this.dataService.create(createDatumDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('WEBMASTER')
  @UseGuards(SecretGuard)
  findAll(@Headers() headers) {
    const app_id = headers['app-id'];
    return this.dataService.findAllByApp(app_id);
  }

  @Get('stats')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('WEBMASTER')
  @UseGuards(SecretGuard)
  getAppStats(@Headers() headers) {
    const app_id = headers['app-id'];
    return this.dataService.appStat(app_id);
  }

  @Get('/tag/:tag')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('WEBMASTER')
  @UseGuards(SecretGuard)
  findEventsByTag(@Headers() headers, @Param('tag') tag: string) {
    const app_id = headers['app-id'];
    return this.dataService.findEventsByTag(app_id, tag);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAllAdmin() {
    return this.dataService.findAll();
  }

  @Get(':id')
  @UseGuards(SecretGuard)
  findOne(@Headers() headers, @Param('id') id: string) {
    const app_id = headers['app-id'];
    return this.dataService.findOne(id, app_id);
  }

  @Patch(':id')
  @UseGuards(SecretGuard)
  update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() updateDatumDto: UpdateDatumDto,
  ) {
    const app_id = headers['app-id'];
    return this.dataService.update(id, updateDatumDto);
  }

  @Delete(':id')
  @UseGuards(SecretGuard)
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
