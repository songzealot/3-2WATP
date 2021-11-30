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

  postArticle(article): Observable<any> {
    const registerUrl = this.prepEndPoint('articles/post_article');
    return this.http.post<any>(registerUrl, article, httpOptions);
  }

  postView(_id): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/postView');
    return this.http.post<any>(registerUrl, _id, httpOptions);
  }
}
