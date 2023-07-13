import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';

@Controller('api/events')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  create(@Headers() headers, @Body() createDatumDto: CreateDatumDto) {
    const app_id = headers['app-id'];
    const app_secret = headers['app-secret'];
    createDatumDto = { ...createDatumDto, app_id, app_secret };
    return this.dataService.create(createDatumDto);
  }

  @Get()
  findAll(@Headers() headers) {
    const app_id = headers['app-id'];
    const app_secret = headers['app-secret'];
    return this.dataService.findAllByApp(app_id, app_secret);
  }

  // TODO: Rajouter RoleGuard ADMIN
  @Get()
  findAllAdmin() {
    return this.dataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() updateDatumDto: UpdateDatumDto,
  ) {
    const app_id = headers['app-id'];
    const app_secret = headers['app-secret'];
    return this.dataService.update(+id, updateDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
