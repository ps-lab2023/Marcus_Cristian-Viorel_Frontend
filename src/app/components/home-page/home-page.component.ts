import {Component} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent {
  username: string = "";
  date: string = new Date().toLocaleString('en-us', {weekday: 'long', day: 'numeric', month: 'long'});

  // websocket
  stock: any = {};

  private webSocket: WebSocket;

  constructor(private router: Router,
              private loginService: LoginService) {

    this.username = this.loginService.getUsername();
    this.webSocket = new WebSocket('ws://localhost:8082/stocks');
    this.webSocket.onmessage = (event) => {
      this.stock = JSON.parse(event.data);
    }
  }

  credentialsActivity() {
    this.router.navigate(['/credentials-activity']);
  }

  bookingActivity() {
    this.router.navigate(['/booking-activity']);
  }

  guestActivity() {
    this.router.navigate(['/guest-activity']);
  }

  vacantRoomsActivity() {
    this.router.navigate(['/vacant-rooms-activity']);
  }
}
