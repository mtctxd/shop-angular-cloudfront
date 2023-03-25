import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (event: unknown) => {
          const url = new URL(request.url);

          switch ((event as any).status) {
            case 401: {
              this.notificationService.showError(
                'You are not authorized to access this page.',
                3000
              );
              break;
            }

            case 403: {
              this.notificationService.showError(
                'You are not authorized to access this page.',
                3000
              );
              break;
            }

            default: {
              this.notificationService.showError(
                `Request to "${url.pathname}" failed. Check the console for the details`,
                0
              );
              break;
            }
          }
        },
      })
    );
  }
}
