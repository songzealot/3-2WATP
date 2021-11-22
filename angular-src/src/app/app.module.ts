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

@NgModule({
  declarations: [
    // ---- 컴포넌트 추가 ----
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 사용자 폼 입력 처리하기 위해 등록
    FormsModule,
    // flash message
    FlashMessagesModule
  ],
  providers: [
    // ---- 서비스 추가 ----
    // register 페이지 입력값 검증
    ValidateService,
    // flash message
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
