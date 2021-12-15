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

  newsCompany: string;
  postList: any;
  reporterList: any;
  count: any;


  constructor(
    private activatedRouter: ActivatedRoute,
    private postService: PostService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      console.log(params);
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
        this.postService.postCompany(this.newsCompany, categoryNum).subscribe((data) => {
          this.postList = data.companyPost;
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
    this.postService.postCount(company).subscribe((data) => {
      this.count = data.count;
    });
  }
}