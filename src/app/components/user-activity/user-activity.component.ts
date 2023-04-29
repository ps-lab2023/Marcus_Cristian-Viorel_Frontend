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
  chosenId: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    console.log("ngOnInit() in UserActivityComponent");
    this.userService.getUsers().subscribe(users => {
        this.users = users;

        // print the length of the users fetched
        console.log("users.length: " + this.users.length);
    });
  }

  goBack(): void {
    window.history.back();
  }

  removeUser(): void {
    console.log("removeUser() in UserActivityComponent");
    this.userService.removeUser(this.chosenId).subscribe(
      () => {
        console.log("User removed");
        this.ngOnInit();
      }
    );
  }
}
