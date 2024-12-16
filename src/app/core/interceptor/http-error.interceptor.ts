import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorData, ErrorService } from '@core/services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let data = {} as ErrorData;
          if (error.error instanceof ErrorEvent) {
            //client-side error
            data = {
              message: error.error.message,
              status: error.status
            }
            this.errorService.addErrors(data);
          } else if (error.error instanceof Blob) {
            this.parseErrorBlob(error);
          } else {
            //server-side error
            let errorMessage = '';
            if (error.status == 400) {
              errorMessage = error.error.message;
            } else if (error.status == 401) {
              errorMessage = error.error.message;
            } else if (error.status == 403) {
              errorMessage = "Operazione non consentita, permessi non sufficienti";
            } else if (error.status == 500) {
              errorMessage = "Errore nel recupero dei dati!";
            } else {
              errorMessage = "Servizio non disponibile!";
            }
            data = {
              error: error && error.error ? error.error : null,
              message: errorMessage,
              status: error.status
            };

            if (error.status !== 403) {
              this.errorService.addErrors(data);
            }
          }

          return throwError(() => error);
        })
      );
  }

  private parseErrorBlob(err: HttpErrorResponse) {
    const reader: FileReader = new FileReader();
    let data = {} as ErrorData;
    reader.onloadend = (e) => {
      const res: string = reader.result as string;
      const errMsg = JSON.parse(res);
      data = {
        message: errMsg.message,
        status: err.status
      }
      this.errorService.addErrors(data);
    }
    reader.readAsText(err.error);
  }

}
