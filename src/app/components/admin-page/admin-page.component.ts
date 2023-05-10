import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {BookingService} from "../../service/booking.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  username: string = "";
  date: string = new Date().toLocaleString('en-us', {weekday: 'long', day: 'numeric', month: 'long'});

  constructor(private router: Router,
              private loginService: LoginService,
              private bookingService: BookingService) {
    this.username = this.loginService.getUsername();
  }

  ngOnInit() {
    this.showSnackBar("Export all bookings to an XML file.", 'black');
  }

  exportBookingsToXML() {
    this.bookingService.exportBookingsToXML().subscribe( (data) => {
/*      const blob = new Blob([data], { type: 'application/xml' });
      FileSaver.saveAs(blob, 'bookings.xml');*/
    });
    this.showSnackBar("Export successful! Check bookings.xml file.");
    setTimeout(() => {
      this.showSnackBar("Export all bookings to an XML file.", 'black');
    }, 3000);
  }

  showSnackBar(message: string, color: string = 'green') {
    const snackbarContainer = document.querySelector('.snackbar-container');
    const existingSnackbar = document.querySelector('.snackbar');

    if (existingSnackbar) {
      if (snackbarContainer) {
        snackbarContainer.removeChild(existingSnackbar);
      }
    }

    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.textContent = message;
    snackbar.style.color = color;

    if (snackbarContainer) {
      snackbarContainer.appendChild(snackbar);

      // Remove snackbar when input fields are modified
      const inputFields = document.querySelectorAll('.form-field input');
      inputFields.forEach((input) => {
        input.addEventListener('input', () => {
          if (snackbarContainer.contains(snackbar)) {
            snackbarContainer.removeChild(snackbar);
          }

          // Remove red borders from input fields
          input.classList.remove('invalid-field');
        });
      });
    }
  }

  userActivity(): void {
    this.router.navigate(['/user-activity']);
  }

  roomActivity() {
    this.router.navigate(['/room-activity']);
  }

  roomTypeActivity() {
    this.router.navigate(['/roomType-activity']);
  }

  guestActivity() {
    this.router.navigate(['/guest-activity']);
  }

  bookingActivity() {
    this.router.navigate(['/booking-activity']);
  }

  credentialsActivity() {
    this.router.navigate(['/credentials-activity']);
  }

  graphActivity() {
    this.router.navigate(['/graph']);
  }
}
