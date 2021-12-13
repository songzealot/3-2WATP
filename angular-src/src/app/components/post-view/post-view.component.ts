import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
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
    private flashMessage: FlashMessagesService
  ) { }


  post_date: string;
  reporter: string;
  title: string;
  contents: string;
  category: string;
  like: Number;
  view: number;
  comment_count: Number;
  newspaper_company: string;

  ngOnInit(): void {
    //get 파라미터 받아오기 - json으로 출력
    this.activateRoute.queryParams.subscribe((params) => {
      console.log(params._id);
      const post_id = { _id: params._id };
      this.postService.postView(post_id).subscribe((data) => {
        console.log(data);
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
          console.log(this.contents);
        }
      });
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

}
