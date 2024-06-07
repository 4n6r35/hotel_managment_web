import { bookingService } from "../data/functions/bookings-functions";
import { Booking } from "../data/models/booking-model";

async function getBooking ({ page, size }: { page: number, size: number }): Promise<Booking[]> {
  try {
    const response = await bookingService.getBokings({ page, size });
    const rooms = response.data.data
    return rooms
  } catch (err) {
    console.error(err);
    return []
  }
}

async function deleteBooking ({ idBooking: idBooking }: { idBooking: number }): Promise<boolean> {
  try {
    const response = await bookingService.deleteBooking({ idBooking: idBooking })
    const { menssage } = response.data

    if (menssage === "La reserva ha sido eliminada ") {
      return true
    }

    return false
  } catch (err) {
    console.error(err);
    return false
  }
}

async function createBooking ({ id_room, entry_date, exit_date }: { id_room: number, entry_date: string, exit_date: string }): Promise<boolean> {
  try {
    const response = await bookingService.createBooking({
      id_room,
      entry_date,
      exit_date,
    })

    const { menssage } = response.data
    if (menssage === "Reserva cargada exitosamente") {
      return true
    }

    return false
  } catch (err) {
    console.error(err);
    return false
  }
}

async function updateBooking ({ id_booking, id_room, entry_date, exit_date }: { id_booking: number, id_room: number, entry_date: string, exit_date: string }): Promise<boolean> {
  try {
    const response = await bookingService.updateBooking({
      id_booking,
      id_room,
      entry_date,
      exit_date,
    })

    const { menssage } = response.data
    if (menssage === "Reserva actualizada exitosamente") {
      return true
    }

    return false
  } catch (err) {
    console.error(err);
    return false
  }
}

export const bookingsUseCases = {
  getBookings: getBooking,
  deleteBooking: deleteBooking,
  createBooking: createBooking,
  updateBooking: updateBooking,
}