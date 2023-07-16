import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApplicationsService } from './applications/applications.service';

@Injectable()
export class SecretGuard implements CanActivate {
  constructor(private applicationsService: ApplicationsService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const app_id = request.headers['app-id'];
    const secret_id = request.headers['app-secret'];

    // const app = this.applicationsService.findOneWithSecret(app_id, secret_id);
    // app.then((app) => {

    //   console.log(app)
    // })

    return false
  }
}