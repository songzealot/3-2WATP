import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ReporterComponent } from './components/reporter/reporter.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { AuthGuard } from './etc/guards';

// 루트에 컴포넌트 등록
// 컴포넌트 추가할 때마다 등록해줄 것
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'newsList', component: NewsListComponent },
  { path: 'newPost', component: NewPostComponent, canActivate: [AuthGuard] },
  { path: 'postView', component: PostViewComponent },
  { path: 'newsCompany', component: CompanyComponent },
  { path: 'reporter', component: ReporterComponent },
  { path: 'subscribe', component: SubscribeComponent, canActivate: [AuthGuard] }
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
