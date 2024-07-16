import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', pageSize.toString());

    return this.http.get(this.baseUrl, { params, observe: 'response' }).pipe(
      map(response => {
        const total = +response.headers.get('x-total-count')!;
        return { data: response.body, total };
      })
    );
  }
}
