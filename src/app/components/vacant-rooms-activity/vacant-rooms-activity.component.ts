import { Component } from '@angular/core';
import {RoomMergedWithRoomType} from "../../model/RoomMergedWithRoomType";
import {Router} from "@angular/router";
import {RoomService} from "../../service/room.service";

@Component({
  selector: 'app-vacant-rooms-activity',
  templateUrl: './vacant-rooms-activity.component.html',
  styleUrls: ['./vacant-rooms-activity.component.css']
})
export class VacantRoomsActivityComponent {
  vacantRooms: RoomMergedWithRoomType[] = [];

  // sort
  sortPriceActive: boolean = false;

  constructor(private roomService: RoomService,
              private router: Router) {
  }

  ngOnInit(sortPriceActive: boolean = false): void {
    console.log("ngOnInit() in VacantRoomsActivityComponent");

    this.roomService.getVacantRooms().subscribe(vacantRooms => {
        this.vacantRooms = vacantRooms;

      if(sortPriceActive) {
        // @ts-ignore
        this.vacantRooms = this.vacantRooms.sort((a, b) => a.cost - b.cost);
      }
    });
  }

  goBack() {
    window.history.back();
  }

  sortByPrice() {
    this.sortPriceActive = !this.sortPriceActive;
    if(this.sortPriceActive) {
      this.ngOnInit(true);
    } else {
      this.ngOnInit(false);
    }
  }
}
