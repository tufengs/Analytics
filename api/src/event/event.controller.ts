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
    const app_secret = headers['app-secret'];
    createDatumDto = { ...createDatumDto, app_id, app_secret };
    return this.dataService.create(createDatumDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('WEBMASTER')
  @UseGuards(SecretGuard)
  findAll(@Headers() headers) {
    const app_id = headers['app-id'];
    const app_secret = headers['app-secret'];
    return this.dataService.findAllByApp(app_id, app_secret);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('WEBMASTER')
  @UseGuards(SecretGuard)
  getAppStats() {

  }

  // TODO: Rajouter RoleGuard ADMIN
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
    const app_secret = headers['app-secret'];
    return this.dataService.findOne(id, app_id, app_secret);
  }

  @Patch(':id')
  @UseGuards(SecretGuard)
  update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() updateDatumDto: UpdateDatumDto,
  ) {
    const app_id = headers['app-id'];
    const app_secret = headers['app-secret'];
    return this.dataService.update(id, updateDatumDto);
  }

  @Delete(':id')
  @UseGuards(SecretGuard)
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
