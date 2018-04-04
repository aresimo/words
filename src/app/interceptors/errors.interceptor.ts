import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { AppState } from '../interfaces/appState.interface';
import { SET_ERROR } from './../store/error.actions';
import { ErrorData } from './../store/error.interfaces';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).catch((err) => {
      console.log(err, 'error');
      const payloadError = {
        code: err.status,
        codeText: err.statusText,
        errorMessage: err.message,
      };
      this.store.dispatch({ type: SET_ERROR, payload: payloadError });
      return Observable.throw(err);

      // .do(
      //   (event) => {
      //   },
      //   (err: any) => {
      //     if (err instanceof HttpErrorResponse) {
      //       const payloadError = {
      //         code: err.status,
      //         codeText: err.statusText,
      //         errorMessage: err.message,
      //       };
      //       this.store.dispatch({ type: SET_ERROR, payload: payloadError });
      //     }
      //   },
      // );
    });
  }
}
