import { Component } from '@angular/core';
import {RoomJoinRoomType} from "../../model/RoomJoinRoomType";
import {RoomService} from "../../service/room.service";
import {RoomType} from "../../model/RoomType";
import {RoomTypeService} from "../../service/roomType.service";
import {RoomMergedWithRoomType} from "../../model/RoomMergedWithRoomType";
import {ValidatorService} from "../../service/validator.service";

@Component({
  selector: 'app-room-activity',
  templateUrl: './room-activity.component.html',
  styleUrls: ['./room-activity.component.css']
})
export class RoomActivityComponent {
  // list all available rooms
  rooms: RoomMergedWithRoomType[] = [];

  // add new room
  roomTypes: RoomType[] = [];
  selectedRoomNumber: any;
  selectedRoomTypeId: any;
  newRoom: RoomJoinRoomType = new RoomJoinRoomType();

  // modify room
  changedRoomNumberToModify: any;
  changedRoomTypeIdToModify: any;

  // filters
  filterSortByPriceActive: boolean = false;

  // vacant rooms
  vacantRooms: RoomMergedWithRoomType[] = [];

  // validation
  isInvalidChangedRoomNumber: boolean = false;
  isInvalidSelectedRoomNumber: boolean = false;


  constructor(private roomService: RoomService,
              private roomTypeService: RoomTypeService) {
  }

  ngOnInit(filterSortByPriceActive: boolean = false): void {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;

      if(filterSortByPriceActive) { // sort by price
        // @ts-ignore
        this.rooms.sort((a, b) => a.cost - b.cost);
      }
    });

    this.roomTypeService.getRoomTypes().subscribe(roomTypes => {
      this.roomTypes = roomTypes;
    });

    this.roomService.getVacantRooms().subscribe(vacantRooms => {
      this.vacantRooms = vacantRooms;
    });
  }

  goBack() {
    window.history.back();
  }

  removeRoom(id: any) {
    this.roomService.removeRoom(id).subscribe(
      () => {
        this.rooms = this.rooms.filter(room => room.id != id);
        this.ngOnInit();
      }
    );
  }

  addRoom() {
    // validation
    this.isInvalidSelectedRoomNumber = ValidatorService.isInvalidRoomNumber(this.selectedRoomNumber);

    this.newRoom.number = this.selectedRoomNumber;
    this.newRoom.roomType = new RoomType();
    // @ts-ignore
    this.newRoom.roomType.id = this.selectedRoomTypeId;

    this.roomService.addRoom(this.newRoom).subscribe(
      () => {
        this.roomService.getRooms().subscribe(rooms => {
          this.rooms = rooms;
        });
      });
  }

  modifyRoom(id: any) {
    // validation
    this.isInvalidChangedRoomNumber = ValidatorService.isInvalidRoomNumber(this.changedRoomNumberToModify);

    this.roomService.updateRoom(id, this.changedRoomNumberToModify, this.changedRoomTypeIdToModify).subscribe(
        () => {
          this.ngOnInit();
        });
  }

  sortByPrice() {
    this.filterSortByPriceActive = !this.filterSortByPriceActive;
    if(this.filterSortByPriceActive) {
      this.ngOnInit(true);
    } else {
      this.ngOnInit();
    }
  }
}
