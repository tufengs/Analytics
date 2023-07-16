import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Event} from "../event/schemas/event.schema";
import {CreateCredentialDto} from "./dto/create-credential-dto";

@Injectable()
export class CredentialsService {
    constructor(private prismaService: PrismaService) {}

    async create(payload: {createCredentialDto: CreateCredentialDto, app_id: string}) {
        return this.prismaService.credential.create({
            data: {
                applicationId: payload.app_id,
                title: payload.createCredentialDto.title,
            }
        })
    }

    async remove(id: string) {
        return this.prismaService.credential.delete({
            where: {
                id
            }
        })
    }

    async findAllApplication(application_id: string) {
        return this.prismaService.credential.findMany({
            where: {
                applicationId: application_id
            },
            select: {
                id: true,
                title: true,
            }
        })
    }
}
