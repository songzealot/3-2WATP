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
    this.authService.getProfile().subscribe((profile) => {
      this.reporter = profile.user.nickname;
      this.newspaper_company = profile.user.newspaper_company;
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
