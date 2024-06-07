export interface RoomModel {
  message: string;
  data: Room[];
}

export interface Room {
  id_room: number;
  number: number;
  type: string;
  value: string;
  is_available: boolean;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
}
