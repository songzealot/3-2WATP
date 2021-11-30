import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  title: string;
  contents: string;
  category: string;

  constructor() { }

  ngOnInit(): void {
  }

  onPostSubmit() {

  }
}
