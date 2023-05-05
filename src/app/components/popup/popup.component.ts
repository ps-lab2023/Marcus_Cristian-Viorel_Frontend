import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() showPopup: boolean = false;
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.title = '';
    this.message = '';
  }

  closePopup(): void {
    this.showPopup = false;
    this.closed.emit(true);
  }
}
