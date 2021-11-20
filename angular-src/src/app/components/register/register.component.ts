import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nickname: string;
  username: string;
  password: string;
  passwordCheck: string;
  age: number;
  gender: string;

  constructor() { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      nickname: this.nickname,
      username: this.username,
      password: this.password,
      age: this.age,
      gender: this.gender
    }
    console.log(user);
  }
}
