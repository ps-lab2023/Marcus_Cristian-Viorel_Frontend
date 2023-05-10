import { Component } from '@angular/core';
import {Booking} from "../../model/Booking";
import {BookingService} from "../../service/booking.service";
import {User} from "../../model/User";
import {LoginService} from "../../service/login.service";
import {ValidatorService} from "../../service/validator.service";

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

  // validation
  isInvalidChangedCheckInDate: boolean = false;
  isInvalidChangedCheckOutDate: boolean = false;
  isInvalidChangedTotal: boolean = false;
  isInvalidSelectedCheckInDate: boolean = false;
  isInvalidSelectedCheckOutDate: boolean = false;
  isInvalidSelectedTotal: boolean = false;

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

    // default dropdown values
    this.changedIsPaid = "false";
    this.selectedIsPaid = "false";
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

    this.isInvalidSelectedCheckInDate = ValidatorService.isInvalidDate(this.selectedCheckInDate);
    this.isInvalidSelectedCheckOutDate = ValidatorService.isInvalidDate(this.selectedCheckOutDate);
    this.isInvalidSelectedTotal = ValidatorService.isInvalidPrice(this.selectedTotal);

    console.log("validareeee " + this.isInvalidSelectedCheckInDate + " " + this.isInvalidSelectedCheckOutDate + " " + this.isInvalidSelectedTotal);

    if (this.isInvalidSelectedCheckInDate || this.isInvalidSelectedCheckOutDate || this.isInvalidSelectedTotal) {
      return;
    }

    if (ValidatorService.parseDate(this.selectedCheckInDate) > ValidatorService.parseDate(this.selectedCheckOutDate)) {
      this.isInvalidSelectedCheckInDate = true;
      this.isInvalidSelectedCheckOutDate = true;
      return;
    }

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

    // validation
    this.isInvalidChangedCheckInDate = ValidatorService.isInvalidDate(this.changedCheckInDate);
    this.isInvalidChangedCheckOutDate = ValidatorService.isInvalidDate(this.changedCheckOutDate);
    this.isInvalidChangedTotal = ValidatorService.isInvalidPrice(this.changedTotal);

    if(ValidatorService.parseDate(this.changedCheckInDate) > ValidatorService.parseDate(this.changedCheckOutDate)) {
      this.isInvalidChangedCheckInDate = true;
      this.isInvalidChangedCheckOutDate = true;
    } else {
      this.isInvalidChangedCheckInDate = false;
      this.isInvalidChangedCheckOutDate = false;
    }

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
