import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) { }

  postId: string;
  post_date: string;
  reporter: string;
  title: string;
  contents: string;
  category: string;
  like: number;
  view: number;
  comment_count: number;
  newspaper_company: string;

  comment_content: string;
  comment_re: string;

  commentList: any;
  nicknameCheck: string;

  reComment_id: string;

  ngOnInit(): void {
    //get 파라미터 받아오기 - json으로 출력
    this.activateRoute.queryParams.subscribe((params) => {
      this.postId = params._id;
      const post_id = { _id: params._id };
      this.postService.postView(post_id).subscribe((data) => {
        if (!data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeoout: 3000 });
          this.router.navigate(['/newsList']);
        } else {
          this.post_date = this.dateString(data.article.post_date);
          this.reporter = data.article.reporter;
          this.title = data.article.title;
          this.contents = data.article.contents;
          this.category = data.article.category;
          this.like = data.article.like;
          this.view = data.article.view;
          this.comment_count = data.article.comment_count;
          this.newspaper_company = data.article.newspaper_company;
        }
      });
    });

    this.authService.getProfile().subscribe((data) => { this.nicknameCheck = data.user.nickname });

    this.postService.commentView(this.postId).subscribe((data) => {
      let temp = data.commentList;
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].commentType == "de" && temp[i].commentList.length == 0) {
          temp.splice(i, 1);
          i--;
        }
      }
      this.commentList = temp;
    });

  }

  dateString(date1) {
    var date = new Date(date1);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);

    var dateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return dateString;
  }
  // 기사 추천
  countUpLike() {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe((data) => {
        // data.user.nickname
        this.postService.postLike(this.postId, data.user.nickname).subscribe((data) => {
          console.log(data);
          if (!data.success) {
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          } else {
            this.like = this.like + 1;
          }
        });
      });
    } else {
      this.flashMessage.show('로그인이 필요합니다', { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
  // 댓글 추가
  addComment(type) {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe((data) => {
        let contents_temp;
        console.log(type);
        if (type == 'co') {
          contents_temp = this.comment_content
        } else if (type == 're') {
          contents_temp = this.comment_re
        }
        const comment = {
          contents: contents_temp,
          writer: data.user.nickname,
          target: this.postId,
          commentType: type
        }
        this.postService.addComment(comment).subscribe((data) => {
          if (data.success) {
            //this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
            location.reload();
            //return data.comment._id;
          } else {
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
            location.reload();
            return;
          }
        });
      });
    } else {
      this.flashMessage.show('로그인이 필요합니다.', { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
  // 댓글 추천
  commentLike(_id) {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe((data) => {
        this.postService.commentLike(_id, data.user.nickname).subscribe((data) => {
          if (data.success) {
            location.reload();
          } else {
            this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
      });
    } else {
      this.flashMessage.show('로그인이 필요합니다.', { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
  // 댓글 삭제
  commentDelete(_id, writer) {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe((data) => {
        if (writer == data.user.nickname) {
          this.postService.commentDelete(_id).subscribe((data) => {
            if (data.success) {
              location.reload();
              //this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
            } else {
              this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
            }
          });
        } else {
          this.flashMessage.show('본인확인오류', { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }

  // 대댓글
  addReComment(_id, type) {
    let temp = this.addComment(type);
    console.log(_id);
    //console.log(temp);
  }

}
