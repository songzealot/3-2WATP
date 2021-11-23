import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Login } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    // ---- 서비스 등록 ----
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const login: Login = {
      username: this.username,
      password: this.password
    };
    const result = this.validateService.validateLogin(login);
    if (result.success) {
      // 입력값에 문제가 없을 때
      this.authService.authenticateUser(login).subscribe((data) => {
        // 로그인 정보에 문제가 없을 때
        if (data.success) {
          console.log(data);
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['/']);
        } else {
          // 로그인 정보에 문제가 있을 때
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/login']);
        }
      });
    } else {
      // 입력값에 문제가 있을 때
      this.flashMessage.show(result.msg, { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/login']);
    }
  }
}
