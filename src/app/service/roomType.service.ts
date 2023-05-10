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
    return this.httpClient.get<RoomType[]>(this.baseUrl + '/findAll');
  }

  removeRoomType(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/delete/' + id);
  }

  addRoomType(roomType: RoomType) {
    return this.httpClient.put<RoomType>(this.baseUrl + '/add', roomType);
  }

  updateRoomType(selectedRoomTypeId: any, changedRoomTypeNameToModify: any, changedRoomTypeCostToModify: any, changedRoomTypeDescriptionToModify: any) {
    return this.httpClient.put<RoomType>(this.baseUrl + '/update/' + selectedRoomTypeId + '/' + changedRoomTypeNameToModify + '/' + changedRoomTypeCostToModify + '/' + changedRoomTypeDescriptionToModify, null);
  }
}
