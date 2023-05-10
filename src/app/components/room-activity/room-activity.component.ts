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
    console.log("ngOnInit() in RoomActivityComponent");
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;

      if(filterSortByPriceActive) { // sort by price
        // @ts-ignore
        this.rooms.sort((a, b) => a.cost - b.cost);
      }

      // print the length of the rooms fetched
      console.log("rooms.length: " + this.rooms.length);
    });

    this.roomTypeService.getRoomTypes().subscribe(roomTypes => {
      this.roomTypes = roomTypes;

      // print the length of the roomTypes fetched
      console.log("roomTypes.length: " + this.roomTypes.length);
    });

    this.roomService.getVacantRooms().subscribe(vacantRooms => {
      this.vacantRooms = vacantRooms;

      // print the length of the vacantRooms fetched
      console.log("vacantRooms.length: " + this.vacantRooms.length);
    });
  }

  goBack() {
    window.history.back();
  }

  removeRoom(id: any) {
    console.log("removeRoom() in RoomActivityComponent");
    this.roomService.removeRoom(id).subscribe(
      () => {
        this.rooms = this.rooms.filter(room => room.id != id);
        console.log("Room removed");
        this.ngOnInit();
      },
      error => {
        //TODO: handle error/case when room is taken by a booking
      }
    );
  }

  addRoom() {
    // TOOD: show table with roomtypes and just request input of an id (bug-less)
    console.log("addRoom() in RoomActivityComponent");

    // validation
    this.isInvalidSelectedRoomNumber = ValidatorService.isInvalidRoomNumber(this.selectedRoomNumber);

    this.newRoom.number = this.selectedRoomNumber;
    this.newRoom.roomType = new RoomType();
    // @ts-ignore
    this.newRoom.roomType.id = this.selectedRoomTypeId;

    console.log("Chosen id: " + this.newRoom.roomType?.id);

    this.roomService.addRoom(this.newRoom).subscribe(
      () => {
        console.log("Room added");
        this.roomService.getRooms().subscribe(rooms => {
          this.rooms = rooms;
        });
      });
  }

  modifyRoom(id: any) {
    console.log("modifyRoom() in RoomActivityComponent");

    // validation
    this.isInvalidChangedRoomNumber = ValidatorService.isInvalidRoomNumber(this.changedRoomNumberToModify);

    this.roomService.updateRoom(id, this.changedRoomNumberToModify, this.changedRoomTypeIdToModify).subscribe(
        () => {
          console.log("Room modified");
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
