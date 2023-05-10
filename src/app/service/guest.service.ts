import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GuestMergedWithGuestData} from "../model/GuestMergedWithGuestData";
import {GuestJoinGuestData} from "../model/GuestJoinGuestData";

@Injectable({
  providedIn: 'root'
})

export class GuestService {
  baseUrl = "http://localhost:8082/guest";

  constructor(private httpClient: HttpClient) {
  }

  getGuests(): Observable<GuestMergedWithGuestData[]> {
    return this.httpClient.get<GuestMergedWithGuestData[]>(this.baseUrl + '/findAllWithGuestData');
  }

  removeGuest(chosenId: any) {
    return this.httpClient.delete(this.baseUrl + '/delete/' + chosenId);
  }

  addGuest(newGuest: GuestJoinGuestData) {
    return this.httpClient.put(this.baseUrl + '/add', newGuest);
  }
}
