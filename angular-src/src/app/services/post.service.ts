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
    //return 'http://localhost:3000/' + ep;
    //서버 동작용
    return ep;
  }

  //기사 추가
  postArticle(article): Observable<any> {
    const registerUrl = this.prepEndPoint('articles/post_article');
    return this.http.post<any>(registerUrl, article, httpOptions);
  }
  //기사 1개 조회
  postView(_id): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/postView');
    return this.http.post(registerUrl, _id, httpOptions);
  }

  //기사 목록 조회
  postListView(category): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/newsList');
    return this.http.post(registerUrl, category, httpOptions);
  }

  // 신문사, 카테고리별 기사 목록
  postCompany(forPost): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/companyPost');
    return this.http.post(registerUrl, forPost, httpOptions);
  }

  // 기사 좋아요
  postLike(_id, nickname): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/likeUp');
    return this.http.post(registerUrl, { _id: _id, nickname: nickname }, httpOptions);
  }

  // 댓글 추가
  addComment(comment): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/addComment');
    return this.http.post(registerUrl, comment, httpOptions);
  }
  // 댓글 표시
  commentView(_id): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/commentView');
    return this.http.post(registerUrl, { _id: _id }, httpOptions);
  }
  // 댓글 추천
  commentLike(_id, nickname): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/commentLike');
    return this.http.post(registerUrl, { _id: _id, nickname: nickname }, httpOptions);
  }
  // 댓글 삭제
  commentDelete(_id): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/commentDelete');
    return this.http.post(registerUrl, { _id: _id }, httpOptions);
  }
  // 기사 개수
  postCount(forCount): Observable<any> {
    const registerUrl = this.prepEndPoint('posts/postCount');
    return this.http.post(registerUrl, forCount, httpOptions);
  }
}
