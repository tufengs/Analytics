export class CreateDatumDto {
  app_id: string;
  session_id: string;
  visitor_id: string;
  data?: object;
  event: string;
  host: string;
  path: string;
  tag: string;
  timestamp: Date;
}
