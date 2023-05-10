import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GuestData} from "../model/GuestData";

@Injectable({
  providedIn: 'root'
})

export class GuestDataService {
  baseUrl = "http://localhost:8082/guestdata";

  constructor(private httpClient: HttpClient) {
  }

  addGuestData(guestData: GuestData) {
    return this.httpClient.put(this.baseUrl + '/add', guestData);
  }
}
