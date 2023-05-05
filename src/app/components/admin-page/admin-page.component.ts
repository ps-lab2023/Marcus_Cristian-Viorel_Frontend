import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  username: string = "";
  date: string = new Date().toLocaleString('en-us', {weekday: 'long', day: 'numeric', month: 'long'});

  constructor(private router: Router,
              private loginService: LoginService) {
    this.username = this.loginService.getUsername();
  }

  userActivity(): void {
    this.router.navigate(['/user-activity']);
  }

  roomActivity() {
    this.router.navigate(['/room-activity']);
  }

  roomTypeActivity() {
    this.router.navigate(['/roomType-activity']);
  }

  guestActivity() {
    this.router.navigate(['/guest-activity']);
  }

  bookingActivity() {
    this.router.navigate(['/booking-activity']);
  }

  credentialsActivity() {
    this.router.navigate(['/credentials-activity']);
  }
}
