import {Body, Controller, Delete, Get, Headers, Param, Post, Request, UseGuards} from '@nestjs/common';
import {TagService} from "../tag/tag.service";
import {CredentialsService} from "./credentials.service";
import {CreateTagDto} from "../tag/dto/create-tag.dto";
import {CreateCredentialDto} from "./dto/create-credential-dto";
import {AuthGuard} from "../auth.guard";
import {RolesGuard} from "../roles.guard";
import {Roles} from "../roles.decorator";

@Controller('credentials')
export class CredentialsController {

    constructor(private readonly credentialService: CredentialsService) {}
    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    create(@Request() request, @Body() createCredentialDto: CreateCredentialDto) {
        const {user} = request
        return this.credentialService.create({ createCredentialDto: createCredentialDto, app_id: user.app_id });
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    findAllApplication(@Request() request) {
        const {user} = request
        return this.credentialService.findAllApplication(user.app_id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('WEBMASTER')
    remove(@Headers() headers, @Param('id') id: string) {
        return this.credentialService.remove(id);
    }
}
