export interface Booking {
  id_booking: number;
  id_room: number;
  id_user: number;
  entry_date: Date;
  exit_date: Date;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
}
