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
      }
    });

    this.postService.postCompany(this.newsCompany, 1).subscribe((data) => {
      this.postList = data.companyPost;
    });

    this.authService.getReporter(this.newsCompany).subscribe((data) => {
      this.reporterList = data.list;
      console.log(this.reporterList);
    });
  }

  getCompanyPost(category) {
    this.postService.postCompany(this.newsCompany, category).subscribe((data) => {
      this.postList = data.companyPost;
    });
  }
}
