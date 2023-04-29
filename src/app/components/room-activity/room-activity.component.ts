import { Component } from '@angular/core';
import {RoomJoinRoomType} from "../../model/RoomJoinRoomType";
import {RoomService} from "../../service/room.service";
import {RoomType} from "../../model/RoomType";
import {RoomTypeService} from "../../service/roomType.service";
import {RoomMergedWithRoomType} from "../../model/RoomMergedWithRoomType";

@Component({
  selector: 'app-room-activity',
  templateUrl: './room-activity.component.html',
  styleUrls: ['./room-activity.component.css']
})
export class RoomActivityComponent {
  // list all available rooms
  rooms: RoomMergedWithRoomType[] = [];

  // remove room
  chosenId: any;

  // add new room
  roomTypes: RoomType[] = [];
  selectedRoomNumber: any;
  selectedRoomTypeId: any;
  newRoom: RoomJoinRoomType = new RoomJoinRoomType();

  // modify room
  selectedRoomId: any;
  changedRoomNumberToModify: any;
  changedRoomTypeIdToModify: any;

  // filters
  filterSortByPriceActive: boolean = false;

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
  }

  goBack() {
    window.history.back();
  }

  removeRoom() {
    console.log("removeRoom() in RoomActivityComponent");
    this.roomService.removeRoom(this.chosenId).subscribe(
      () => {
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

  modifyRoom() {
    console.log("modifyRoom() in RoomActivityComponent");
    console.log("selectedRoomId: " + this.selectedRoomId);
    console.log("changedRoomNumberToModify: " + this.changedRoomNumberToModify);
    console.log("changedRoomTypeIdToModify: " + this.changedRoomTypeIdToModify);

    if(this.selectedRoomId == null || this.selectedRoomId == "") {
      return;
    } else {
      this.roomService.updateRoom(this.selectedRoomId, this.changedRoomNumberToModify, this.changedRoomTypeIdToModify).subscribe(
        () => {
          console.log("Room modified");
          this.ngOnInit();
        });
    }
  }

  fetchRoomData() {
    console.log("fetchRoomData() in RoomActivityComponent");
    let fetchedRoom = this.findRoomById(this.selectedRoomId);

    if(fetchedRoom != null) {
      this.changedRoomNumberToModify = fetchedRoom.number;
      this.changedRoomTypeIdToModify = fetchedRoom.roomTypeId;
    } else {
      this.changedRoomNumberToModify = "";
      this.changedRoomTypeIdToModify = "";
    }
  }

  findRoomById(id: any): any {
    for(let room of this.rooms) {
      if(room.id == id) {
        return room;
      }
    }
    return null;
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
