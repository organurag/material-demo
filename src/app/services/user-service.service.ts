import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../data.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', pageSize.toString());

    return this.http.get(this.baseUrl, { params, observe: 'response' }).pipe(
      map(response => {
        const total = +response.headers.get('items')!;
        return { data: response.body, total };
      })
    );
  }

  getAllUsers(){
    return this.http.get(this.baseUrl)
  }

  addUsers(user: UserModel): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  
  updateItem(id: number, user: UserModel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }


  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}

