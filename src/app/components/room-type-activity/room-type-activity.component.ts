import { Component } from '@angular/core';
import {RoomType} from "../../model/RoomType";
import {RoomTypeService} from "../../service/roomType.service";

@Component({
  selector: 'app-room-type-activity',
  templateUrl: './room-type-activity.component.html',
  styleUrls: ['./room-type-activity.component.css']
})
export class RoomTypeActivityComponent {
  // list all available roomTypes
  roomTypes: RoomType[] = [];

  // remove roomType
  chosenId: any;

  // add new roomType
/*  selectedId: any;*/
  selectedName: any;
  selectedCost: any;
  selectedDescription: any;

  // modify roomType
  selectedRoomTypeId: any;
  changedRoomTypeNameToModify: any;
  changedRoomTypeCostToModify: any;
  changedRoomTypeDescriptionToModify: any;

  constructor(private roomTypeService: RoomTypeService) {
  }

  ngOnInit(): void {
    console.log("ngOnInit() in RoomTypeActivityComponent");
    this.roomTypeService.getRoomTypes().subscribe(roomTypes => {
      this.roomTypes = roomTypes;

      // print the length of the roomTypes fetched
      console.log("roomTypes.length: " + this.roomTypes.length);
    });
  }

  goBack(): void {
    window.history.back();
  }

  removeRoomType(): void {
    console.log("removeRoomType() in RoomTypeActivityComponent");
    this.roomTypeService.removeRoomType(this.chosenId).subscribe(
      () => {
        console.log("RoomType removed");
        this.ngOnInit();
      },
      error => {
        // TODO: handle error/case when roomType is taken by a room
      });
  }

  addRoomType() {
    console.log("addRoomType() in RoomTypeActivityComponent");
    if (!(this.selectedName == null || this.selectedCost == null || this.selectedDescription == null)) {
      let roomType: RoomType = new RoomType();
/*      roomType.id = this.selectedId;*/
      roomType.name = this.selectedName;
      roomType.cost = this.selectedCost;
      roomType.description = this.selectedDescription;

      this.roomTypeService.addRoomType(roomType).subscribe(
        () => {
          console.log("RoomType added");
          this.ngOnInit();
        });
    }
  }

  modifyRoomType() {
    console.log("modifyRoomType() in RoomTypeActivityComponent");

    if(this.selectedRoomTypeId == null || this.selectedRoomTypeId == "") {
      return;
    } else {
      this.roomTypeService.updateRoomType(this.selectedRoomTypeId, this.changedRoomTypeNameToModify, this.changedRoomTypeCostToModify, this.changedRoomTypeDescriptionToModify).subscribe(
        () => {
          console.log("RoomType modified");
          this.ngOnInit();
        });
    }
  }

  fetchRoomTypeData() {
    console.log("fetchRoomTypeData() in RoomTypeActivityComponent");
    let fetchedRoomType = this.findRoomTypeById(this.selectedRoomTypeId);

    if(fetchedRoomType != null) {
      this.changedRoomTypeNameToModify = fetchedRoomType.name;
      this.changedRoomTypeCostToModify = fetchedRoomType.cost;
      this.changedRoomTypeDescriptionToModify = fetchedRoomType.description;
    } else {
      this.changedRoomTypeNameToModify = "";
      this.changedRoomTypeCostToModify = "";
      this.changedRoomTypeDescriptionToModify = "";
    }
  }

  findRoomTypeById(id: any): any {
    console.log("findRoomTypeById() in RoomTypeActivityComponent");
    for(let roomType of this.roomTypes) {
      if (roomType.id == id) {
        return roomType;
      }
    }
    return null;
  }
}
