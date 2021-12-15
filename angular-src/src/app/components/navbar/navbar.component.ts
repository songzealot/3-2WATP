import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private authService: AuthService, private router: Router) { }

  status: string;

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });

    if (!this.checkLoggedIn()) {
      this.authService.logout();
    }
  }

  logout(): void {
    this.authService.logout();
    //this.router.navigate(['login']);
    location.reload();
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
