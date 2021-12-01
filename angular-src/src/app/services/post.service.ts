import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  //개발/서버 동작 시 라우팅 경로 변경
  prepEndPoint(ep) {
    //개발용
    return 'http://localhost:3000/' + ep;
    //서버 동작용
    //return ep;
  }

  //기사 추가
  postArticle(article): Observable<any> {
    const registerUrl = this.prepEndPoint('articles/post_article');
    return this.http.post<any>(registerUrl, article, httpOptions);
  }
  //기사 조회
  postView(_id): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/postView');
    return this.http.post(registerUrl, _id, httpOptions);
  }

  //기사 목록 조회
  postListView(category): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/newsList');
    return this.http.post(registerUrl, category, httpOptions);
  }
}
