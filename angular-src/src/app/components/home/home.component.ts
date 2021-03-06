import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newPost: any;
  bestViewPost: any;

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postService.postListView({ index: 1 }).subscribe((data) => {
      this.newPost = data.postList[0];
      this.bestViewPost = data.sortByViewList[0];
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
  //아 멘탈;;
}
