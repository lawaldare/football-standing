import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { vars } from 'environment-vars';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = environment.apiToken;
    if (token) {
      const reqWithToken = req.clone({
        setHeaders: {
          'X-Auth-Token': token,
        },
      });
      return next.handle(reqWithToken);
    }
    return next.handle(req);
  }
}
