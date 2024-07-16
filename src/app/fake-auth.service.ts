import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class FakeAuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.API_URL}`).pipe(
      map(users => {
        const user = users.find(u =>  u.username === username && u.password === password);

        
        if (user) {
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(user));
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getName(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }
}
