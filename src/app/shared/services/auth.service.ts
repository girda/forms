import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import {tap} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;

  constructor(private http: HttpClient) {

  }

  login(user: User): Observable<any> {
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/login`, user)
      .pipe(
        tap(
          (data) => {
            localStorage.setItem('auth-token', data.access_token);
            this.setToken(data.access_token);
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}