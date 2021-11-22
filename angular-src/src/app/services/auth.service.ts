import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: User;

  constructor(private http: HttpClient) { }

  registerUser(user): Observable<any> {
    const registerUrl = 'http://localhost:3000/users/register';
    return this.http.post(registerUrl, user, httpOptions);
  }
}
