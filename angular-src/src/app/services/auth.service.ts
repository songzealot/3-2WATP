import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, User, UserLoginInfo } from '../models/user';

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

  // 회원가입
  registerUser(user): Observable<any> {
    const registerUrl = 'http://localhost:3000/users/register';
    return this.http.post<any>(registerUrl, user, httpOptions);
  }

  // 로그인
  authenticateUser(login: Login): Observable<any> {
    const loginUrl = 'http://localhost:3000/users/authenticate';
    return this.http.post<any>(loginUrl, login, httpOptions);
  }

  // 로그인정보 로컬스토리지 저장
  storeUserData(token: any, userLoginInfo: UserLoginInfo) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo));
  }
}
