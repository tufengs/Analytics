import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class ApplicationsService {
    constructor(private prismaService: PrismaService) {}

    async findAll(){
        return this.prismaService.application.findMany()
    }
}
