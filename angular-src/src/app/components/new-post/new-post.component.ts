import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  title: string;
  contents: string;
  category: string;
  reporter: string;
  newspaper_company: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // if (!this.authService.checkStatus()) {
    //   this.flashMessage.show("잘못된 접근입니다.", { cssClass: 'alert-danger', timeout: 3000 });
    //   this.router.navigate(['/']);
    // }

    this.authService.getProfile().subscribe((profile) => {
      if (profile.user.status != '기자') {
        this.flashMessage.show("잘못된 접근입니다.", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this.reporter = profile.user.nickname;
        this.newspaper_company = profile.user.newspaper_company;
      }
    }, (err) => {
      console.log(err);
      return false;
    });

  }

  onPostSubmit() {
    // nickname
    const article = {
      title: this.title,
      contents: this.contents,
      category: this.category,
      reporter: this.reporter,
      newspaper_company: this.newspaper_company
    }
    this.postService.postArticle(article).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/newPost']);
      }
    });
  }
}
