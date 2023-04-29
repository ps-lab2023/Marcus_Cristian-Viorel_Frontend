import {User} from "./User";

export class Booking {
  id: bigint | undefined;
  checkInDate: string | undefined;
  checkOutDate: string | undefined;
  total: number | undefined;
  isPaid: boolean | undefined;
  user: User | undefined;
}
