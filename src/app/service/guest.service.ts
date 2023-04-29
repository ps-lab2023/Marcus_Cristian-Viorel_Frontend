import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GuestMergedWithGuestData} from "../model/GuestMergedWithGuestData";
import {Booking} from "../model/Booking";
import {GuestJoinGuestData} from "../model/GuestJoinGuestData";

@Injectable({
  providedIn: 'root'
})

export class GuestService {
  baseUrl = "http://localhost:8082/guest";

  constructor(private httpClient: HttpClient) {
  }

  getGuests(): Observable<GuestMergedWithGuestData[]>{
    console.log("getGuests() in GuestService");
    return this.httpClient.get<GuestMergedWithGuestData[]>(this.baseUrl + '/findAllWithGuestData');
  }

  removeGuest(chosenId: any) {
    console.log("removeGuest() in GuestService");
    return this.httpClient.delete(this.baseUrl + '/delete/' + chosenId);
  }

  addGuest(newGuest: GuestJoinGuestData) {
    console.log("addGuest() in GuestService");
    return this.httpClient.put(this.baseUrl + '/add', newGuest);
  }
}
