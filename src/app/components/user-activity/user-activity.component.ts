import { Component } from '@angular/core';
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    console.log("ngOnInit() in UserActivityComponent");
    this.userService.getUsers().subscribe(users => {
        this.users = users;

        // add 3 hours to every user lastLogin field (Data type)
        this.users.forEach(user => {
          if(user.lastLogin) {
            // @ts-ignore
            user.lastLogin = new Date(user.lastLogin) + 3 * 60 * 60 * 1000;
            // @ts-ignore
            user.lastLogin = user.lastLogin.toString().substring(0, 24);
          }
        });

        // print the length of the users fetched
        console.log("users.length: " + this.users.length);
    });
  }

  goBack(): void {
    window.history.back();
  }

  removeUser(id: any): void {
    console.log("removeUser() in UserActivityComponent");
    this.userService.removeUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id != id);
        console.log("User removed");
        this.ngOnInit();
      }
    );
  }
}
