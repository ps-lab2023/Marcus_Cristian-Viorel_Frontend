import {Injectable} from "@angular/core";
import {RoomJoinRoomType} from "../model/RoomJoinRoomType";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RoomMergedWithRoomType} from "../model/RoomMergedWithRoomType";
import {Room} from "../model/Room";

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  baseUrl = "http://localhost:8082/room";

  constructor(private httpClient: HttpClient) {
  }

  getRooms(): Observable<RoomMergedWithRoomType[]> {
    return this.httpClient.get<RoomMergedWithRoomType[]>(this.baseUrl + '/findAllWithRoomTypes');
  }

  removeRoom(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/delete/' + id);
  }

  addRoom(room: RoomJoinRoomType): Observable<RoomJoinRoomType> {
    return this.httpClient.put<RoomJoinRoomType>(this.baseUrl + '/add/' + room.number + '/' + room.roomType?.id, room);
  }

  updateRoom(selectedRoomId: any, changedRoomNumberToModify: any, changedRoomTypeIdToModify: any) {
    return this.httpClient.put<RoomJoinRoomType>(this.baseUrl + '/update/' + selectedRoomId + '/' + changedRoomNumberToModify + '/' + changedRoomTypeIdToModify, null);
  }

  getRoomById(selectedRoomId: any): Observable<Room> {
    return this.httpClient.get<Room>(this.baseUrl + '/findById/' + selectedRoomId);
  }

  getVacantRooms(): Observable<RoomMergedWithRoomType[]> {
    return this.httpClient.get<RoomMergedWithRoomType[]>(this.baseUrl + '/findAllVacantWithRoomTypes');
  }
}
