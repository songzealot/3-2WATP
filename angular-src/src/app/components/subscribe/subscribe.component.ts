import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  subscribe_company: any;
  subscribe_reporter: any;

  postList_company: any;
  postList_reporter: any;

  ngOnInit(): void {
    this.authService.getProfile().subscribe((data) => {
      this.postList_company = [];
      this.postList_reporter = [];
      this.subscribe_company = data.user.subscribe_com;
      this.subscribe_reporter = data.user.subscribe_rep;

      this.subView('newspaper_company', this.subscribe_company);
      this.subView('reporter', this.subscribe_reporter);

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

  redirectPost(post_id) {
    this.router.navigate([`/postView`], { queryParams: { _id: post_id } });
  }


  // 구독 중인 내용 확인
  test1(type, temp) {
    let forPost = {
      type: type,
      value: temp,
      category: 1
    }
    return new Promise((resolve) => {
      this.postService.postCompany(forPost).subscribe((data) => {
        const forList = {
          target: temp,
          postList: data.postList
        }
        resolve(forList);
      });
    });
  }

  async subView(type, temp2) {
    const promises = temp2.map(async (data) => {
      return await this.test1(type, data)
        .then()
    });

    this.postList_reporter = await Promise.all(promises);
    console.log(this.postList_reporter);
  }
}

