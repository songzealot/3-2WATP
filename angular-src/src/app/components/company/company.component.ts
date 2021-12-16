import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  username: string;
  newsCompany: string;
  postList: any;
  reporterList: any;
  count: any;
  checkSub: any;


  constructor(
    private activatedRouter: ActivatedRoute,
    private postService: PostService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      if (!params.company) {
        this.flashMessage.show("잘못된 접근", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this.newsCompany = params.company;
        let categoryNum;
        if (!params.cate) {
          categoryNum = 1
        } else {
          categoryNum = params.cate
        }
        const temp = {
          type: 'newspaper_company',
          value: this.newsCompany,
          category: categoryNum
        }
        this.postService.postCompany(temp).subscribe((data) => {
          this.postList = data.postList;
          this.checkSubscribe().then((data) => this.checkSub = data);
        });
      }
    });

    // 기사 개수
    this.postCount(this.newsCompany);
    // 기자 목록
    this.authService.getReporter(this.newsCompany).subscribe((data) => {
      this.reporterList = data.list;
    });
  }

  // getCompanyPost(category) {
  //   this.postService.postCompany(this.newsCompany, category).subscribe((data) => {
  //     this.postList = data.companyPost;
  //   });
  // }

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

  //기사 개수
  postCount(company) {
    const temp = {
      type: 'newspaper_company',
      value: company
    }
    this.postService.postCount(temp).subscribe((data) => {
      this.count = data.count;
    });
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  checkSubscribe() {
    return new Promise((resolve, reject) => {
      this.authService.getProfile().subscribe((data) => {
        this.username = data.user.username;
        if (data.user.subscribe_com.includes(this.newsCompany)) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  goSubscribe() {
    if (this.checkLoggedIn()) {
      let forSub = {
        type: 'company',
        value: this.newsCompany,
        username: this.username
      }
      this.authService.goSubscribe(forSub).subscribe((data) => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          location.reload();
        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', tiemout: 3000 });
        }
      });
    } else {
      this.flashMessage.show('로그인이 필요합니다.', { cssClass: 'alert-danger', timeout: 3000 });
    }
  }

  unSubscribe() {
    if (this.checkLoggedIn()) {
      let forSub = {
        type: 'company',
        value: this.newsCompany,
        username: this.username
      }
      this.authService.unSubscribe(forSub).subscribe((data) => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          location.reload();
        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', tiemout: 3000 });
        }
      });
    } else {
      this.flashMessage.show('잘못된 접근', { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
}