import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FlashMessagesService } from 'angular2-flash-messages';

export interface DialogData {
  nickname: string;
  username: string;
  age: string;
  gender: string;
  status: string;
  newspaper_company: string;
  password: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  nickname: string;
  username: string;
  age: string;
  gender: string;
  status: string;
  newspaper_company: string;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private flashMessage: FlashMessagesService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(profileedit, {
      minHeight: '500px',
      width: '250px',

      data: {
        nickname: this.nickname,
        username: this.username,
        age: this.age,
        gender: this.gender,
        status: this.status,
        newspaper_company: this.newspaper_company,
      },
    });
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.nickname = profile.user.nickname;
        this.username = profile.user.username;
        this.age = profile.user.age;
        this.gender = profile.user.gender;
        this.status = profile.user.status;
        if (profile.user.newspaper_company != undefined) {
          this.newspaper_company = profile.user.newspaper_company;
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}

@Component({
  selector: 'profileedit',
  templateUrl: 'profileedit.html',
})
export class profileedit {

  nickname: string;
  username: string;
  age: string;
  gender: string;
  status: string;
  newspaper_company: string;
  
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private flashMessage: FlashMessagesService,
    public dialogRef: MatDialogRef<profileedit>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileComponent
  ) {}

  pfeditSubmit() {
    const user = {
      nickname: this.nickname,
      username: this.username,
      age: this.age,
      gender: this.gender,
      status: this.status,
      newspaper_company: this.newspaper_company,
    };

    this.authService.updateUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000,
        });
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    });
  }
}
