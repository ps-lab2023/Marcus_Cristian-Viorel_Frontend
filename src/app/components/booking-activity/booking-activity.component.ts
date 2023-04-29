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

  // delete booking
  chosenId: any;

  // add booking
  selectedCheckInDate: any;
  selectedCheckOutDate: any;
  selectedTotal: any;
  selectedIsPaid: any;

  // modify booking
  selectedBookingId: any;
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

  removeBooking() {
    console.log("removeBooking() in BookingActivityComponent");
    this.bookingService.removeBooking(this.chosenId).subscribe(
      () => {
        console.log("Booking removed");
        this.ngOnInit();
      });
  }

  addBooking() {
    console.log("addBooking() in BookingActivityComponent");
    let newBooking = new Booking();

/*    // year will be the first 4 chars of the string
    let year = this.selectedCheckInDate.substring(0, 4);
    // month will be the 6th and 7th chars of the string
    let month = this.selectedCheckInDate.substring(5, 6);
    // day will be the 9th and 10th chars of the string
    let day = this.selectedCheckInDate.substring(7, 9);
    newBooking.checkInDate = new Date(year, month, day);

    // year will be the first 4 chars of the string
    year = this.selectedCheckInDate.substring(0, 4);
    // month will be the 6th and 7th chars of the string
    month = this.selectedCheckInDate.substring(5, 6);
    // day will be the 9th and 10th chars of the string
    day = this.selectedCheckInDate.substring(7, 9);
    newBooking.checkOutDate = new Date(year, month, day);*/

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

  modifyBooking() {
    console.log("modifyBooking() in BookingActivityComponent");

    if(this.selectedBookingId == null || this.selectedBookingId == "") {
      return;
    } else {
      this.bookingService.updateBooking(this.selectedBookingId, this.changedCheckInDate, this.changedCheckOutDate, this.changedTotal, this.changedIsPaid).subscribe(
        () => {
          console.log("Booking modified");
          this.ngOnInit();
        });
    }
  }

  fetchBookingData() {
    console.log("fetchBookingData() in BookingActivityComponent");
    let fetchedBooking = this.findBookingById(this.selectedBookingId);

    if(fetchedBooking != null) {
      this.changedCheckInDate = fetchedBooking.checkInDate;
      this.changedCheckOutDate = fetchedBooking.checkOutDate;
      this.changedTotal = fetchedBooking.total;
      this.changedIsPaid = fetchedBooking.isPaid;
    } else {
      this.changedCheckInDate = null;
      this.changedCheckOutDate = null;
      this.changedTotal = null;
      this.changedIsPaid = null;
    }
  }

  findBookingById(id: any) {
    for(let booking of this.bookings) {
      if(booking.id == id) {
        return booking;
      }
    }
    return null;
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
