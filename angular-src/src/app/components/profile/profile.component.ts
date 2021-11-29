import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nickname: string;
  username: string;
  age: string;
  gender: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.nickname = profile.user.nickname;
      this.username = profile.user.username;
      this.age = profile.user.age;
      this.gender = profile.user.gender;
    }, (err) => {
      console.log(err);
      return false;
    });
  }

}
