import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Booking} from "../model/Booking";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  baseUrl = "http://localhost:8082/booking";

  constructor(private httpClient: HttpClient) {
  }

  getBookings(): Observable<Booking[]> {
    console.log("getBookings() in BookingService");
    return this.httpClient.get<Booking[]>(this.baseUrl + '/findAll');
  }

  findBookingById(selectedBookingId: any): Observable<Booking> {
    console.log("findBookingById() in BookingService");
    return this.httpClient.get<Booking>(this.baseUrl + '/findBookingById/' + selectedBookingId);
  }

  removeBooking(selectedBookingId: any): Observable<any> {
    console.log("removeBooking() in BookingService");
    return this.httpClient.delete(this.baseUrl + '/delete/' + selectedBookingId);
  }

  addBooking(newBooking: Booking): Observable<any> {
    console.log("addBooking() in BookingService");
    return this.httpClient.put(this.baseUrl + '/add', newBooking);
  }

  updateBooking(selectedBookingId: any, changedCheckInDate: any, changedCheckOutDate: any, changedTotal: any, changedIsPaid: any) {
    console.log("updateBooking() in BookingService");
    return this.httpClient.put<Booking>(this.baseUrl + '/update/' + selectedBookingId + '/' + changedCheckInDate + '/' + changedCheckOutDate + '/' + changedTotal + '/' + changedIsPaid, null);
  }
}
