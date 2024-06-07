import { roomService } from "../data/functions/rooms-functions";
import { Room } from "../data/models/rooms-model";

async function getRooms ({ page, size }: { page: number, size: number }): Promise<Room[]> {
  try {
    const response = await roomService.getRooms({ page, size });
    const rooms = response.data.data
    return rooms
  } catch (err) {
    console.error(err);
    return []
  }
}

async function deleteRoom ({ idRoom }: { idRoom: number }): Promise<boolean> {
  try {
    const response = await roomService.deleteRoom({ idRoom })
    const { menssage } = response.data

    if (menssage === "Se ha eliminado la habitacion ") {
      return true
    }

    return false
  } catch (err) {
    console.error(err);
    return false
  }
}

async function createRoom ({ number, type, value }: { number: number, type: string, value: number }): Promise<boolean> {
  try {
    const response = await roomService.createRoom({
      number,
      type,
      value,
    })

    const { menssage } = response.data
    if (menssage === "Habitacion agregada exitosamente") {
      return true
    }

    return false
  } catch (err) {
    console.error(err);
    return false
  }
}

async function updateRoom ({ id_room, number, type, value }: { id_room: number, number: number, type: string, value: number }): Promise<boolean> {
  try {
    const response = await roomService.updateRoom({
      id_room,
      number,
      type,
      value,
    })

    const { menssage } = response.data
    if (menssage === "Habitacion actualizada exitosamente") {
      return true
    }

    return false
  } catch (err) {
    console.error(err);
    return false
  }
}

export const roomsUseCases = {
  getRooms,
  deleteRoom,
  createRoom,
  updateRoom,
}