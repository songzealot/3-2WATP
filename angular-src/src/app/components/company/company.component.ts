import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  newsCompany: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private postService: PostService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      console.log(params);
      if (!params.company) {
        this.flashMessage.show("잘못된 접근", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this.newsCompany = params.company;
      }
    })
  }

}
