import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  baseUrl = 'http://localhost:8080/api/auth/users';
  constructor(private http: HttpClient) { }

  getUser(user_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${user_id}`);
  }
  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }
  deleteUser(user_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${user_id}`, { responseType: 'text' });
  }
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/api/auth/alluser');
  }
  updateUser(user_id: number, value: any): Observable<Object> {
    return this.http.put(`http://localhost:8080/api/auth/users/${user_id}`, value);
  }

}
