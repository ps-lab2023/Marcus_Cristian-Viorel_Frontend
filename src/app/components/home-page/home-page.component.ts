import { Component } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {RoomMergedWithRoomType} from "../../model/RoomMergedWithRoomType";
import {RoomService} from "../../service/room.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  username: string = "";
  date: string = new Date().toLocaleString('en-us', {weekday: 'long', day: 'numeric', month: 'long'});

  // list all rooms-merged-roomtypes
  rooms: RoomMergedWithRoomType[] = [];

  constructor(private router: Router,
              private loginService: LoginService,
              private roomService: RoomService) {
    this.username = this.loginService.getUsername();
  }

  ngOnInit(): void {
    console.log("ngOnInit() in HomePageComponent");
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;

      // print the length of the rooms fetched
      console.log("rooms.length: " + this.rooms.length);
    });
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
}
