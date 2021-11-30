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
  status: string;
  newspaper_company: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.nickname = profile.user.nickname;
      this.username = profile.user.username;
      this.age = profile.user.age;
      this.gender = profile.user.gender;
      this.status = profile.user.status;
      if (profile.user.newspaper_company != undefined) {
        this.newspaper_company = profile.user.newspaper_company;
      }
    }, (err) => {
      console.log(err);
      return false;
    });
  }

}
