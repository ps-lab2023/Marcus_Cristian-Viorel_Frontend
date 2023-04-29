import {Booking} from "./Booking";
import {Room} from "./Room";
import {GuestData} from "./GuestData";

export class GuestJoinGuestData {
  id: bigint | undefined;
  booking: Booking | undefined;
  room: Room | undefined;
  guestData: GuestData | undefined;
}
