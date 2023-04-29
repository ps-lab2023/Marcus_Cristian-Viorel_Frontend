import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-register-activity',
  templateUrl: './register-activity.component.html',
  styleUrls: ['./register-activity.component.css']
})
export class RegisterActivityComponent {
  chosenUsername: any;
  chosenPassword: any;
  chosenIsAdmin: any;
  users: User[] = [];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users =>
        this.users = users
    );
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  register() {
    console.log("register() in RegisterActivityComponent");

    if(this.chosenUsername == null || this.chosenPassword == null || this.chosenIsAdmin == null) {
      return;
    } else {
      // find for duplicate username
      for(let user of this.users) {
        if(user.name == this.chosenUsername) {
          // TODO: show error message (snackbar)
          console.log("duplicate username");
          this.showSnackBar("Duplicate username!");
          return;
        }
      }

      let newUser = new User();
      newUser.name = this.chosenUsername;
      newUser.pass = this.chosenPassword;
      newUser.isAdmin = this.chosenIsAdmin == "Admin";

      this.userService.addUser(newUser).subscribe(
        () => {
          console.log("User added");
          // wait for 3 secs
          this.showSnackBar("Register success! Redirecting to login...", 'green');
          setTimeout(() => {
            this.router.navigate(['/login']);}
            , 3000);
        },
        error => {
          console.log("Error adding user");
        });
    }
  }

  showSnackBar(message: string, color: string = 'red') {
    const snackbarContainer = document.querySelector('.snackbar-container');
    const existingSnackbar = document.querySelector('.snackbar');

    if (existingSnackbar) {
      if (snackbarContainer) {
        snackbarContainer.removeChild(existingSnackbar);
      }
    }

    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.textContent = message;
    snackbar.style.color = color;

    if (snackbarContainer) {
      snackbarContainer.appendChild(snackbar);

      // Remove snackbar when input fields are modified
      const inputFields = document.querySelectorAll('.form-field input');
      inputFields.forEach((input) => {
        input.addEventListener('input', () => {
          if (snackbarContainer.contains(snackbar)) {
            snackbarContainer.removeChild(snackbar);
          }

          // Remove red borders from input fields
          input.classList.remove('invalid-field');
        });
      });
    }
  }
}
