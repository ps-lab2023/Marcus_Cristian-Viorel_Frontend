import { Component } from '@angular/core';
import {GuestMergedWithGuestData} from "../../model/GuestMergedWithGuestData";
import {GuestService} from "../../service/guest.service";
import {Booking} from "../../model/Booking";
import {BookingService} from "../../service/booking.service";
import {RoomMergedWithRoomType} from "../../model/RoomMergedWithRoomType";
import {RoomService} from "../../service/room.service";
import {GuestJoinGuestData} from "../../model/GuestJoinGuestData";
import {Room} from "../../model/Room";
import {GuestData} from "../../model/GuestData";
import {GuestDataService} from "../../service/guestData.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-guest-activity',
  templateUrl: './guest-activity.component.html',
  styleUrls: ['./guest-activity.component.css']
})
export class GuestActivityComponent {
  guests: GuestMergedWithGuestData[] = [];
  rooms: RoomMergedWithRoomType[] = []
  bookings: Booking[] = [];

  // add new guest
  selectedBookingId: any;
  selectedRoomId: any;
  selectedName: any;
  selectedEmail: any;
  selectedPhone: any;
  selectedAddress: any;
  newGuest: GuestJoinGuestData = new GuestJoinGuestData();

  // filtering
  filterSortNamesActive: boolean = false;

  constructor(private guestService: GuestService,
              private bookingService: BookingService,
              private roomService: RoomService,
              private guestDataService: GuestDataService){
  }

  ngOnInit(filterSortNamesActive: boolean = false): void {
    console.log("ngOnInit() in GuestActivityComponent");
    this.guestService.getGuests().subscribe(guests => {
      this.guests = guests;
      if(filterSortNamesActive) { // sort by name
        // @ts-ignore
        this.guests.sort((a, b) => a.name.localeCompare(b.name));
      }
      // print the length of the guests fetched
      console.log("guests.length: " + this.guests.length);
    });


    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
      // tidy the booking dates to show friendly format
      this.bookings.forEach(booking => {
        // @ts-ignore
        booking.checkInDate = booking.checkInDate.substring(0, 10);
        // @ts-ignore
        booking.checkOutDate = booking.checkOutDate.substring(0, 10);
      });
      console.log("bookings.length: " + this.bookings.length);
    });

    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
      console.log("rooms.length: " + this.rooms.length);
    });
  }

  goBack() {
    window.history.back();
  }

  removeGuest(id: any) {
    console.log("removeGuest() in GuestActivityComponent");
    this.guestService.removeGuest(id).subscribe(
      () => {
        console.log("Guest removed");
        this.ngOnInit();
      });
  }

  // TODO: addGuest() is not working
  // cu siguranta e de la faptul ca trimit un guestData.user null
  addGuest() {
    console.log("addGuest() in GuestActivityComponent");
      this.bookingService.findBookingById(this.selectedBookingId).subscribe(booking => {
        this.newGuest.booking = booking;
/*        this.newGuest.id = this.newGuest.booking.id;*/
/*        this.newGuest.booking = booking;*/
        console.log("this.newGuest.booking.id: " + this.newGuest.booking.id);
      });

    this.roomService.getRoomById(this.selectedRoomId).subscribe(room => {
      this.newGuest.room = room;
/*      this.newGuest.id = this.newGuest.room.id;*/
      console.log("this.newGuest.room.id: " + this.newGuest.room.id);
    });

    this.newGuest.guestData = new GuestData();
    this.newGuest.guestData.name = this.selectedName;
    this.newGuest.guestData.email = this.selectedEmail;
    this.newGuest.guestData.phone = this.selectedPhone;
    this.newGuest.guestData.address = this.selectedAddress;

/*    this.guestDataService.addGuestData(this.newGuest.guestData).subscribe(
      () => {
        console.log("GuestData added");
      });

    this.guestService.addGuest(this.newGuest).subscribe(
      () => {
        console.log("Guest added");
      });*/

    this.guestDataService.addGuestData(this.newGuest.guestData)
      .pipe(
        switchMap(() => this.guestService.addGuest(this.newGuest))
      )
      .subscribe();
    console.log("AM AJUNS SI AICI FINALLY");
    this.ngOnInit();
  }

  sortNames() {
    this.filterSortNamesActive = !this.filterSortNamesActive;
    if(this.filterSortNamesActive) {
      this.ngOnInit(true);
    } else {
      this.ngOnInit();
    }
  }
}
