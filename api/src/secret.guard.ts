import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApplicationsService } from './applications/applications.service';
import { cp } from 'fs';

@Injectable()
export class SecretGuard implements CanActivate {
  constructor(private applicationsService: ApplicationsService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const app_id = request.headers['app-id'];
    const secret_id = request.headers['app-secret'];

    let result = false;

    this.applicationsService.findOneWithSecret(app_id, secret_id).then(app => {
      if (app)
        result = true
    })

    return result;
  }
}