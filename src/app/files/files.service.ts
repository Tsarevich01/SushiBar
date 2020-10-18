import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private httpClient: HttpClient) {}
  public post(url: string, file: any): Observable<any> {
    return this.httpClient.post<any>(url, file);
  }
}
