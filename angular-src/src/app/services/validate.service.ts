import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // register 페이지 입력값 유효성 검증
  validateRegister(user, passwordCheck) {
    if (user.username == undefined || user.username == '') {
      return { success: false, msg: "ID를 입력하세요." }
    } else if (user.password == undefined || user.password == '') {
      return { success: false, msg: "비밀번호를 입력하세요." }
    } else if (user.password != passwordCheck) {
      return { success: false, msg: "재입력 비밀번호가 일치하지 않습니다." }
    } else if (user.nickname == undefined || user.nickname == '') {
      return { success: false, msg: "닉네임을 입력하세요." }
    } else if (user.gender == undefined) {
      return { success: false, msg: "성별을 선택하세요." }
    } else if (user.age == undefined) {
      return { success: false, msg: "나이를 선택하세요." }
    } else if (user.status == undefined) {
      return { success: false, msg: "계정 유형을 선택하세요." }
    } else if (user.status == '기자' && user.newspaper_company == undefined) {
      return { success: false, msg: "신문사를 선택하세요." }
    } else {
      return { success: true, msg: "입력값 유효성 확인" }
    }
  }

  validateLogin(login) {
    if (login.username == undefined || login.username == '') {
      return ({ success: false, msg: "ID를 입력하세요." });
    } else if (login.password == undefined || login.password == '') {
      return ({ success: false, msg: "비밀번호를 입력하세요." })
    } else {
      return ({ success: true, msg: "로그인 성공" });
    }
  }
}
