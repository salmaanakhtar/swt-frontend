import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/login`, { email, password });
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/signup`, user);
  }
}
