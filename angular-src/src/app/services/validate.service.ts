import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  // register 페이지 입력값 유효성 검증
  validateRegister(user) {
    if (user.username == undefined) {
      return { success: false, msg: "ID를 입력하세요." }
    } else if (user.password == undefined) {
      return { success: false, msg: "패스워드를 입력하세요." }
    } else if (user.password != user.passwordCheck) {
      return { success: false, msg: "재입력 비밀번호가 일치하지 않습니다." }
    } else if (user.nickname == undefined) {
      return { success: false, msg: "닉네임을 입력하세요." }
    } else if (user.gender == undefined) {
      return { success: false, msg: "성별을 선택하세요." }
    } else if (user.age == undefined) {
      return { success: false, msg: "나이를 선택하세요." }
    } else {
      return { success: true, msg: "입력값 유효성 확인" }
    }
  }
}
