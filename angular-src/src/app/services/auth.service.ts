import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  //개발/서버 동작 시 라우팅 경로 변경
  prepEndPoint(ep) {
    //개발용
    return 'http://localhost:3000/' + ep;
    //서버 동작용
    //return ep;
  }


  // 회원가입
  registerUser(user): Observable<any> {
    const registerUrl = this.prepEndPoint('users/register');
    return this.http.post<any>(registerUrl, user, httpOptions);
  }

  // 로그인
  authenticateUser(login: Login): Observable<any> {
    const loginUrl = this.prepEndPoint('users/authenticate');
    return this.http.post<any>(loginUrl, login, httpOptions);
  }

  // 로그인정보 로컬스토리지 저장
  storeUserData(token: any, userLoginInfo: UserLoginInfo) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo));
  }
  // 로그아웃
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
  }
  // 로그인 여부 확인
  loggedIn(): boolean {
    let authToken: any = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(authToken);
  }
  getProfile(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptionsP = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken
      })
    }
    const profileUrl = this.prepEndPoint('users/profile');
    return this.http.get(profileUrl, httpOptionsP);
  }

}

