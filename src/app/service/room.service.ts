import {Injectable} from "@angular/core";
import {RoomJoinRoomType} from "../model/RoomJoinRoomType";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    console.log("getRooms() in RoomService");
    return this.httpClient.get<RoomMergedWithRoomType[]>(this.baseUrl + '/findAllWithRoomTypes');
  }

  removeRoom(id: number): Observable<any> {
    console.log("removeRoom() in RoomService");
    return this.httpClient.delete(this.baseUrl + '/delete/' + id);
  }

  addRoom(room: RoomJoinRoomType): Observable<RoomJoinRoomType> {
    console.log("addRoom() in RoomService");
    // return a request to the server that looks like this: localhost:8082/room/add/666/1
    return this.httpClient.put<RoomJoinRoomType>(this.baseUrl + '/add/' + room.number + '/' + room.roomType?.id, room);
  }

  updateRoom(selectedRoomId: any, changedRoomNumberToModify: any, changedRoomTypeIdToModify: any) {
    console.log("updateRoom() in RoomService");
    return this.httpClient.put<RoomJoinRoomType>(this.baseUrl + '/update/' + selectedRoomId + '/' + changedRoomNumberToModify + '/' + changedRoomTypeIdToModify, null);
  }

  getRoomById(selectedRoomId: any): Observable<Room> {
    console.log("getRoomById() in RoomService");
    return this.httpClient.get<Room>(this.baseUrl + '/findById/' + selectedRoomId);
  }
}
