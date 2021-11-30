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

  post_date: Date;
  reporter: string;
  title: string;
  contents: string;
  category: string;
  like: Number;
  view: Number;
  comment_count: Number;
  newspaper_company: string;

  ngOnInit(): void {
    //get 파라미터 받아오기 - json으로 출력
    this.activateRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.postService.postView(params._id).subscribe((data) => {
        if (!data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeoout: 3000 });
          this.router.navigate(['/postList']);
        } else {
          this.post_date = data.article.post_date;
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
    })
  }

}
