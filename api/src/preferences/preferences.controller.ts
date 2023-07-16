import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { AuthGuard } from 'src/auth.guard';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  @Roles('WEBMASTER', 'ADMIN')
  create(@Request() req, @Body() createPreferenceDto: CreatePreferenceDto) {
    const { user } = req;
    return this.preferencesService.create({ ...createPreferenceDto, userId: user.sub });
  }

  @Get()
  @Roles('WEBMASTER', 'ADMIN')
  findAll(@Request() req) {
    const { user } = req;
    return this.preferencesService.findAll(user.sub);
  }

  @Get(':id')
  @Roles('WEBMASTER', 'ADMIN')
  findOne(@Param('id') id: string) {
    return this.preferencesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('WEBMASTER', 'ADMIN')
  update(@Param('id') id: string, @Body() updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferencesService.update(+id, updatePreferenceDto);
  }

  @Delete(':id')
  @Roles('WEBMASTER', 'ADMIN')
  remove(@Param('id') id: string) {
    return this.preferencesService.remove(id);
  }
}
