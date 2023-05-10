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
    return this.httpClient.get<Booking[]>(this.baseUrl + '/findAll');
  }

  findBookingById(selectedBookingId: any): Observable<Booking> {
    return this.httpClient.get<Booking>(this.baseUrl + '/findBookingById/' + selectedBookingId);
  }

  removeBooking(selectedBookingId: any): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/delete/' + selectedBookingId);
  }

  addBooking(newBooking: Booking): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/add', newBooking);
  }

  updateBooking(selectedBookingId: any, changedCheckInDate: any, changedCheckOutDate: any, changedTotal: any, changedIsPaid: any) {
    return this.httpClient.put<Booking>(this.baseUrl + '/update/' + selectedBookingId + '/' + changedCheckInDate + '/' + changedCheckOutDate + '/' + changedTotal + '/' + changedIsPaid, null);
  }

  exportBookingsToXML(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/export/xml');
  }
}
