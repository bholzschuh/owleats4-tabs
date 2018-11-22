import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UinfoService } from '../../services/uinfo.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;

  constructor(
    private route: Router,
    private authService: AuthService,
    private uinfo: UinfoService,
  ) { }

  ngOnInit() {
    this.uinfo.getInfo(this.authService.getUID()).subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
  }

  logout() {
    this.authService.logout();
  }

}
