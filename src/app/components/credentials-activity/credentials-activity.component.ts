import { Component } from '@angular/core';
import {Route, Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-credentials-activity',
  templateUrl: './credentials-activity.component.html',
  styleUrls: ['./credentials-activity.component.css']
})
export class CredentialsActivityComponent {
  changedUsername: any;
  changedPassword: any;
  changedIsAdmin: any;

  // update user
  users: User[] = [];
  isAdmin: boolean = false;

  constructor(private loginService: LoginService, private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.changedUsername = this.loginService.getUsername();
    this.changedPassword = this.loginService.getPassword();
    this.changedIsAdmin = this.loginService.getIsAdmin();
    this.isAdmin = this.loginService.getIsAdmin() == "Admin";
    console.log(this.loginService.getIsAdmin());
  }

  modifyCredentials() {
    console.log("modifyCredentials() in CredentialsActivityComponent");

    if(this.changedUsername == null || this.changedPassword == null || this.changedIsAdmin == null) {
      return;
    } else {
/*      this.getUserIdByUsername(this.loginService.getUsername())*/
      this.userService.updateUser(this.loginService.getUser()?.id, this.changedUsername, this.changedPassword, this.changedIsAdmin == "Admin").subscribe(
        () => {
          console.log("User modified");
          this.router.navigate(['/login']);
        });
    }
  }

  getUserIdByUsername(username: any): any {
    // @ts-ignore
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    for(let user of this.users) {
      console.log("user.name: " + user.name);
    }

    for(let user of this.users) {
      if(user.name == username) {
        console.log("user.id GASITTTT: " + user.id);
        return user.id;
      }
    }
    return -1;
  }

  goBack() {
    window.history.back();
  }
}
