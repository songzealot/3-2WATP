import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  status: string;

  ngOnInit(): void {
    if (!this.checkLoggedIn()) {
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

}
