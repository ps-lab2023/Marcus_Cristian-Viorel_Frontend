import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { User } from '../../model/User';
import { UserService } from '../../service/user.service';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  passwordFieldType = "password";

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let user = new User();
    user.name = this.loginForm.value.name;
    user.pass = this.loginForm.value.pass;
    this.loginService.setUsername(user.name?user.name:"");
    this.loginService.setPassword(user.pass?user.pass:"");

    this.userService.login(user).subscribe(
      (response: User) => {
        user = response;
        this.loginService.setUser(user);
        console.log(user);

        if (user.isAdmin) {
          // Navigate to admin page
          console.log("admin");
          this.loginService.setIsAdmin(true);
          this.router.navigate(['/admin']);
        } else {
          // Navigate to user page
          console.log("user");
          this.loginService.setIsAdmin(false);
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
        this.showSnackBar("Invalid credentials!");

        // Set red borders for incorrect fields
        const inputFields = document.querySelectorAll('.form-field input');
        inputFields.forEach((input) => {
          if (!input.classList.contains('invalid-field')) {
            input.classList.add('invalid-field');
          }
        });
      }
    );
  }

  showSnackBar(message: string) {
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
    snackbar.style.color = "red";

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

  onShowPasswordChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.passwordFieldType = checkbox.checked ? "text" : "password";
  }

  register() {
    this.router.navigate(['/register-activity']);
  }
}
