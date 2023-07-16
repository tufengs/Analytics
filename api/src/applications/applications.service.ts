import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";

@Injectable()
export class ApplicationsService {
    constructor(private prismaService: PrismaService) { }

    async findAll() {
        return this.prismaService.application.findMany()
    }

    // async findOneWithSecret(id: string, secret_id: string) {
    //     return this.prismaService.application.findFirst({
    //         where: {
    //             id: id,
    //             credentials:
    //             {
    //                 id: secret_id
    //             }
    //         }
    //     })
    // }
}
