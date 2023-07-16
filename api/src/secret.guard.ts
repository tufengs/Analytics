import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApplicationsService } from './applications/applications.service';
import { Observable } from 'rxjs';

@Injectable()
export class SecretGuard implements CanActivate {
  constructor(private applicationsService: ApplicationsService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const app_id = request.headers['app-id'];
    const secret_id = request.headers['app-secret'];

    return this.applicationsService.findOneWithSecret(app_id, secret_id)
      .then(app => !!app);
  }
}