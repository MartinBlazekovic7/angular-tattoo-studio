import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getResources<T>(endpoint: string, queryArgs?: string) {
    return this.http.get<Response<T>>(
      `${environment.apiUrl}/${endpoint}?${queryArgs}`
    );
  }
}
