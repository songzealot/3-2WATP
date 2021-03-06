import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.component.html',
  styleUrls: ['./reporter.component.scss']
})
export class ReporterComponent implements OnInit {

  constructor(
    private postService: PostService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) { }
  username: string;
  reporter: any;
  postList: any;
  count: any;
  checkSub: any;

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      if (!params.r) {
        this.flashMessage.show("잘못된 접근", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        let categoryNum;
        if (!params.cate) {
          categoryNum = 1
        } else {
          categoryNum = params.cate
        }

        this.postCount(params.r);
        const temp = {
          type: 'reporter',
          value: params.r,
          category: categoryNum
        }
        this.postService.postCompany(temp).subscribe((data) => {
          this.postList = data.postList;
          this.checkSubscribe().then((data) => this.checkSub = data);
        });
        this.getReporterInfo(params.r);
      }
    });


  }


  //기사 개수
  postCount(reporter) {
    const temp = {
      type: 'reporter',
      value: reporter
    }
    this.postService.postCount(temp).subscribe((data) => {
      this.count = data.count;
    });
  }

  // 기자 정보 확인
  getReporterInfo(username) {
    this.authService.getReporterInfo(username).subscribe((data) => {
      if (data.success) {
        this.reporter = data.reporter;
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  // 기사 보기
  redirectPost(post_id) {
    this.router.navigate([`/postView`], { queryParams: { _id: post_id } });
  }

  // 기사 날짜
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

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
  // 구독 중인지 확인
  // checkSubscribe() {
  //   this.authService.getProfile().subscribe((data) => {
  //     this.username = data.user.username;
  //     if (data.user.subscribe_rep.includes(this.reporter.username)) {
  //       this.checkSub = true;
  //     } else {
  //       this.checkSub = false;
  //     }
  //   });
  //   console.log(this.checkSub);
  // }
  checkSubscribe() {
    return new Promise((resolve, reject) => {
      this.authService.getProfile().subscribe((data) => {
        this.username = data.user.username;
        if (data.user.subscribe_rep.includes(this.reporter.nickname)) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  async chksub() {
    this.checkSub = await this.checkSubscribe();
  }




  goSubscribe() {
    if (this.checkLoggedIn()) {
      let forSub = {
        type: 'reporter',
        value: this.reporter.nickname,
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
        type: 'reporter',
        value: this.reporter.nickname,
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
