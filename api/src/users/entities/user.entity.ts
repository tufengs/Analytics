export class User {
  id: string;
  email: string;
  password: string;
  roles: Role;
  company: string;
  baseUrl: string;
  KBIS?: File;
  application?: object;
}

export enum Role {
  WEBMASTER = 'WEBMASTER',
  ADMIN = 'ADMIN',
}
