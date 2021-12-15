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
import { ProfileComponent, profileedit } from './components/profile/profile.component';
import { AuthGuard } from './etc/guards';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { CompanyComponent } from './components/company/company.component';
import { ReporterComponent } from './components/reporter/reporter.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { MatCardModule } from '@angular/material/card';

//angular material 모듈
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    CompanyComponent,
    ReporterComponent,
    SubscribeComponent,
    profileedit
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
    JwtModule.forRoot({ config: { tokenGetter: () => { return localStorage.getItem('authToken'); } } }),
    //브라우저 애니메이션(버튼클릭시 그림자)
    BrowserAnimationsModule,
    //mat네브 모듈
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
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
