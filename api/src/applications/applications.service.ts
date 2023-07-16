import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";

@Injectable()
export class ApplicationsService {
    constructor(private prismaService: PrismaService) { }

    async findAll() {
        return this.prismaService.application.findMany()
    }

    async findOneWithSecret(id: string, secret_id: string) {
        return this.prismaService.application.findFirstOrThrow({
            where: {
                id,
                credentials: {
                    some: {
                        secret: secret_id
                    }
                }
            }
        })
    }
}
