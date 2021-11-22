import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from 'src/app/services/validate.service';

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

  constructor(
    // ---- 서비스 등록 ----
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      nickname: this.nickname,
      username: this.username,
      password: this.password,
      passwordCheck: this.passwordCheck,
      age: this.age,
      gender: this.gender
    }
    console.log(user);
    const result = this.validateService.validateRegister(user);
    if (result.success == false) {
      this.flashMessage.show(result.msg, { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
  }
}
