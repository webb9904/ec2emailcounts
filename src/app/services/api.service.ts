import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly LOCAL_ROOT_URL = 'http://localhost:3000/';
  readonly ROOT_URL = 'https://gc6ns7mk5b.execute-api.eu-west-1.amazonaws.com/test/';

  constructor(private httpClient: HttpClient) {
  }

  buildServiceUri(uri: string) {
    return this.ROOT_URL + uri;
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || "server error.");
  }

  getRequest(uri: string): Observable<any> {
    const fullUri = this.buildServiceUri(uri);

    return this.httpClient.get<any>(fullUri)
      .pipe(catchError(this.errorHandler));
  }

  postRequest(uri: string, data: any): Observable<any> {
    const fullUri = this.buildServiceUri(uri);

    return this.httpClient.post<any>(fullUri, data)
      .pipe(catchError(this.errorHandler));
  }

  deleteRequest(uri: string, id: number): Observable<any> {
    const fullUri = `${this.buildServiceUri(uri)}/${id}`;

    return this.httpClient.delete<any>(fullUri)
      .pipe(catchError(this.errorHandler));
  }
}
