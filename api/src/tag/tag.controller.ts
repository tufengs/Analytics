import { Controller, Get, Post, Body, Headers, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from 'src/auth.guard';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('tag')
@UseGuards(AuthGuard, RolesGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Roles('WEBMASTER')
  create(@Headers() headers, @Body() createTagDto: CreateTagDto) {
    const app_id = headers['app-id'];
    return this.tagService.create({ ...createTagDto, app_id });
  }

  @Get()
  @Roles('WEBMASTER')
  findAll(@Headers() headers) {
    const app_id = headers['app-id'];
    return this.tagService.findAll(app_id);
  }

  @Get(':id')
  @Roles('WEBMASTER')
  findOne(@Headers() headers, @Param('id') id: string) {
    const app_id = headers['app-id'];
    return this.tagService.findOne(app_id, id);
  }

  @Patch(':id')
  @Roles('WEBMASTER')
  update(@Headers() headers, @Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    const app_id = headers['app-id'];
    return this.tagService.update(app_id, id, updateTagDto);
  }

  @Delete(':id')
  @Roles('WEBMASTER')
  remove(@Headers() headers, @Param('id') id: string) {
    const app_id = headers['app-id'];
    return this.tagService.remove(app_id, id);
  }
}
