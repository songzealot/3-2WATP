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
    this.postList_company = [];
    this.postList_reporter = [];
    this.authService.getProfile().subscribe((data) => {
      this.subscribe_company = data.user.subscribe_com;
      this.subscribe_reporter = data.user.subscribe_rep;


      for (let temp of this.subscribe_company) {
        let forPost = {
          type: 'newspaper_company',
          value: temp,
          category: 1
        }
        this.postService.postCompany(forPost).subscribe((data) => {
          const forList = {
            target: temp,
            postList: data.postList
          }
          this.postList_company.push(forList);
        });
      }
      for (let temp of this.subscribe_reporter) {
        let forPost = {
          type: 'reporter',
          value: temp,
          category: 1
        }
        this.postService.postCompany(forPost).subscribe((data) => {
          const forList = {
            target: temp,
            postList: data.postList
          }
          this.postList_reporter.push(forList);
        });
      }


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
