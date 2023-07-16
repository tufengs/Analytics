import {Credential, User} from "@prisma/client";

export class Application {
    id: string;
    user: User;
    credential: Credential
}

export enum Role {
    WEBMASTER = 'WEBMASTER',
    ADMIN = 'ADMIN',
}
