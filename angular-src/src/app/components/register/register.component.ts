import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
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
  age: string;
  gender: string;
  status: string;
  newspaper_company: string;

  constructor(
    // ---- 서비스 등록 ----
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      nickname: this.nickname,
      username: this.username,
      password: this.password,
      age: this.age,
      gender: this.gender,
      status: this.status,
      newspaper_company: this.newspaper_company
    }
    console.log(user);
    const result = this.validateService.validateRegister(user, this.passwordCheck);
    if (result.success == false) {
      this.flashMessage.show(result.msg, { cssClass: 'alert-danger', timeout: 3000 });
    } else {
      this.authService.registerUser(user).subscribe((data) => {
        if (data.success) {
          this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/register']);
        }
      });
    }
  }
}
