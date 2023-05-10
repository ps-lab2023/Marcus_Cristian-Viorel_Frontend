import { Component } from '@angular/core';
import {RoomType} from "../../model/RoomType";
import {RoomTypeService} from "../../service/roomType.service";
import {ValidatorService} from "../../service/validator.service";

@Component({
  selector: 'app-room-type-activity',
  templateUrl: './room-type-activity.component.html',
  styleUrls: ['./room-type-activity.component.css']
})
export class RoomTypeActivityComponent {
  // list all available roomTypes
  roomTypes: RoomType[] = [];

  // add new roomType
  selectedName: any;
  selectedCost: any;
  selectedDescription: any;

  // modify roomType
  changedRoomTypeNameToModify: any;
  changedRoomTypeCostToModify: any;
  changedRoomTypeDescriptionToModify: any;

  // validation
  isInvalidChangedRoomTypeName: boolean = false;
  isInvalidChangedRoomTypeCost: boolean = false;
  isInvalidChangedRoomTypeDescription: boolean = false;
  isInvalidSelectedRoomTypeName: boolean = false;
  isInvalidSelectedRoomTypeCost: boolean = false;
  isInvalidSelectedRoomTypeDescription: boolean = false;

  constructor(private roomTypeService: RoomTypeService) {
  }

  ngOnInit(): void {
    this.roomTypeService.getRoomTypes().subscribe(roomTypes => {
      this.roomTypes = roomTypes;
    });
  }

  goBack(): void {
    window.history.back();
  }

  removeRoomType(id: any): void {
    this.roomTypeService.removeRoomType(id).subscribe(
      () => {
        this.ngOnInit();
      });
  }

  addRoomType() {
    // validation
    this.isInvalidSelectedRoomTypeName = this.selectedName == null;
    this.isInvalidSelectedRoomTypeCost = ValidatorService.isInvalidPrice(this.selectedCost);
    this.isInvalidSelectedRoomTypeDescription = this.selectedDescription == null;

    if (!this.isInvalidSelectedRoomTypeName && !this.isInvalidSelectedRoomTypeCost && !this.isInvalidSelectedRoomTypeDescription) {
      let roomType: RoomType = new RoomType();
      roomType.name = this.selectedName;
      roomType.cost = this.selectedCost;
      roomType.description = this.selectedDescription;

      this.roomTypeService.addRoomType(roomType).subscribe(
        () => {
          this.ngOnInit();
        });
    }
  }

  modifyRoomType(id: any) {
    // validation
    this.isInvalidChangedRoomTypeName = this.changedRoomTypeNameToModify == null;
    this.isInvalidChangedRoomTypeCost = ValidatorService.isInvalidPrice(this.changedRoomTypeCostToModify);
    this.isInvalidChangedRoomTypeDescription = this.changedRoomTypeDescriptionToModify == null;

    if (!this.isInvalidChangedRoomTypeName && !this.isInvalidChangedRoomTypeCost && !this.isInvalidChangedRoomTypeDescription) {
      this.roomTypeService.updateRoomType(id, this.changedRoomTypeNameToModify, this.changedRoomTypeCostToModify, this.changedRoomTypeDescriptionToModify).subscribe(
        () => {
          this.ngOnInit();
        });
    }
  }

  findRoomTypeById(id: any): any {
    for(let roomType of this.roomTypes) {
      if (roomType.id == id) {
        return roomType;
      }
    }
    return null;
  }
}
