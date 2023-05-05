import { Component } from '@angular/core';
import {Booking} from "../../model/Booking";
import {BookingService} from "../../service/booking.service";
import {User} from "../../model/User";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-booking-activity',
  templateUrl: './booking-activity.component.html',
  styleUrls: ['./booking-activity.component.css']
})
export class BookingActivityComponent {
  bookings: Booking[] = [];

  // add booking
  selectedCheckInDate: any;
  selectedCheckOutDate: any;
  selectedTotal: any;
  selectedIsPaid: any;

  // modify booking
  changedCheckInDate: any;
  changedCheckOutDate: any;
  changedTotal: any;
  changedIsPaid: any;

  // filter
  filterUnpaidActive: boolean = false;

  constructor(private bookingService: BookingService, private loginService: LoginService) {
  }

  ngOnInit(filterUnpaidActive: boolean = false): void {
    console.log("ngOnInit() in BookingActivityComponent");
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;

      // tidy the booking dates to show friendly format
      this.bookings.forEach(booking => {
        // @ts-ignore
        booking.checkInDate = booking.checkInDate.substring(0, 10);
        // @ts-ignore
        booking.checkOutDate = booking.checkOutDate.substring(0, 10);
      });

      if(filterUnpaidActive) { // only paid bookings
        this.bookings = this.bookings.filter(booking => booking.isPaid == false);
      }

      console.log("bookings.length: " + this.bookings.length);
    });
  }

  goBack() {
    window.history.back();
  }

  removeBooking(id: any) {
    console.log("removeBooking() in BookingActivityComponent");
    this.bookingService.removeBooking(id).subscribe(
      () => {
        console.log("Booking removed");
        this.ngOnInit();
      });
  }

  addBooking() {
    console.log("addBooking() in BookingActivityComponent");
    let newBooking = new Booking();

    newBooking.checkInDate = this.selectedCheckInDate;
    newBooking.checkOutDate = this.selectedCheckOutDate;
    newBooking.total = this.selectedTotal;
    newBooking.isPaid = this.selectedIsPaid;
    newBooking.user = this.loginService.getUser();

    this.bookingService.addBooking(newBooking).subscribe(
      () => {
        console.log("Booking added");
        this.ngOnInit();
      });
  }

  modifyBooking(id: any) {
    console.log("modifyBooking() in BookingActivityComponent");
    this.bookingService.updateBooking(id, this.changedCheckInDate, this.changedCheckOutDate, this.changedTotal, this.changedIsPaid).subscribe(
        () => {
          console.log("Booking modified");
          this.ngOnInit();
        });
  }

  filterUnpaid() {
    this.filterUnpaidActive = !this.filterUnpaidActive;
    if(this.filterUnpaidActive) {
      this.ngOnInit(true);
    } else {
      this.ngOnInit();
    }
  }

}
