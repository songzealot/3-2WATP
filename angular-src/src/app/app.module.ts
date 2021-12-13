import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './etc/guards';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [
    // ---- 컴포넌트 추가 ----
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    NewsListComponent,
    NewPostComponent,
    PostViewComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 사용자 폼 입력 처리하기 위해 등록
    FormsModule,
    // flash message
    FlashMessagesModule,
    // http 모듈
    HttpClientModule,
    JwtModule.forRoot({ config: { tokenGetter: () => { return localStorage.getItem('authToken'); } } })
  ],
  providers: [
    // ---- 서비스 추가 ----
    // register 페이지 입력값 검증
    ValidateService,
    // flash message
    FlashMessagesService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
