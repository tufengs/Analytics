import {Application} from "@prisma/client";

export class User {
  id: string;
  email: string;
  password: string;
  roles: Role;
  company: string;
  baseUrl: string;
  KBIS?: File;
  application?: Application;
  validated: boolean;
}

export enum Role {
  WEBMASTER = 'WEBMASTER',
  ADMIN = 'ADMIN',
}
