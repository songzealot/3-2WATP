import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  postlist: any;
  sortByViewList: any;

  constructor(private activateRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      const categoryNum = { index: params.cate }
      this.postService.postListView(categoryNum).subscribe((data) => {
        this.postlist = data.postList;
        this.sortByViewList = data.sortedPostList;
      });
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
}
