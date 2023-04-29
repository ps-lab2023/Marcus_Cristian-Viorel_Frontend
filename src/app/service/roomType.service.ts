import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RoomType} from "../model/RoomType";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RoomTypeService {
  baseUrl = "http://localhost:8082/roomType";

  constructor(private httpClient: HttpClient) {
  }

  getRoomTypes(): Observable<RoomType[]> {
    console.log("getRoomTypes() in RoomTypeService");
    return this.httpClient.get<RoomType[]>(this.baseUrl + '/findAll');
  }

  removeRoomType(id: number): Observable<any> {
    console.log("removeRoomType() in RoomTypeService");
    return this.httpClient.delete(this.baseUrl + '/delete/' + id);
  }

  addRoomType(roomType: RoomType) {
    console.log("addRoomType() in RoomTypeService");
    return this.httpClient.put<RoomType>(this.baseUrl + '/add', roomType);
  }

  updateRoomType(selectedRoomTypeId: any, changedRoomTypeNameToModify: any, changedRoomTypeCostToModify: any, changedRoomTypeDescriptionToModify: any) {
    console.log("updateRoomType() in RoomTypeService");
    return this.httpClient.put<RoomType>(this.baseUrl + '/update/' + selectedRoomTypeId + '/' + changedRoomTypeNameToModify + '/' + changedRoomTypeCostToModify + '/' + changedRoomTypeDescriptionToModify, null);
  }
}
