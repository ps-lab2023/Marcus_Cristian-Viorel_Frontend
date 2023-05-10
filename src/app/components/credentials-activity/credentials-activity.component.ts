import { Component } from '@angular/core';
import {Route, Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";
import {ValidatorService} from "../../service/validator.service";

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

  // validation
  isInvalidChangedUsername: boolean = false;
  isInvalidChangedPassword: boolean = false;

  constructor(private loginService: LoginService, private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.changedUsername = "";
    this.changedPassword = "";
    this.changedIsAdmin = this.loginService.getIsAdmin();
    this.isAdmin = this.loginService.getIsAdmin() == "Admin";
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  modifyCredentials() {
    console.log("modifyCredentials() in CredentialsActivityComponent");

    this.isInvalidChangedUsername = ValidatorService.isInvalidUsername(this.changedUsername);
    this.isInvalidChangedPassword = ValidatorService.isInvalidPassword(this.changedPassword);

    if(this.isInvalidChangedUsername || this.isInvalidChangedPassword) {
      console.log("isInvalidChangedUsername: " + this.isInvalidChangedUsername + ", isInvalidChangedPassword: " + this.isInvalidChangedPassword);
      return;
    }

    let current = this.getUserIdByUsername(this.loginService.getUsername());
    let modified = this.getUserIdByUsername(this.changedUsername);
    this.isInvalidChangedUsername = (current != modified && modified != -1);
    console.log("current: " + current);
    console.log("modified: " + modified);

    console.log("isInvalidChangedUsername: " + this.isInvalidChangedUsername + ", isInvalidChangedPassword: " + this.isInvalidChangedPassword);

    if(this.isInvalidChangedUsername || this.isInvalidChangedPassword) {
      return;
    } else {
      this.userService.updateUser(this.loginService.getUser()?.id, this.changedUsername, this.changedPassword, this.changedIsAdmin == "Admin").subscribe(
        () => {
          console.log("User modified");
          this.router.navigate(['/login']);
        });
    }
  }

  private getUserIdByUsername(username: any): any {
    for(let user of this.users) {
      if(user.name == username) {
        return user.id;
      }
    }
    return -1;
  }

  goBack() {
    window.history.back();
  }
}
