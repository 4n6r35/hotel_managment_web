import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { Booking } from "../../data/models/booking-model"

interface BookingModalZustand {
  createBooking: {
    isOpen: boolean,
    idRoom: number,
    callback: () => void
  },
  editBooking: {
    isOpen: boolean
    booking: Booking,
    callback: () => void
  },
}

interface BookingModalZustandActions {
  tooggleModalCreateBooking: (id_room: number) => void,
  openModalUpdateBooking: (bookign: Booking) => void,
  closeModalUpdateBooking: () => void,
}


export const bookingModalZustand = create(
  persist<BookingModalZustand & BookingModalZustandActions>((set) => ({
    createBooking: {
      isOpen: false,
      idRoom: 0,
      callback: () => { }
    },
    editBooking: {
      isOpen: false,
      booking: {
        id_booking: 0,
        id_room: 0,
        id_user: 0,
        entry_date: new Date(),
        exit_date: new Date(),
        state: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      callback: () => { }
    },
    tooggleModalCreateBooking: (id_room: number) => {
      set(state => ({
        createBooking: {
          ...state.createBooking,
          idRoom: id_room,
          isOpen: !state.createBooking.isOpen
        }
      }))
    },
    openModalUpdateBooking: (booking: Booking) => {
      set(state => ({
        editBooking: {
          ...state.editBooking,
          booking: booking,
          isOpen: true
        }
      }))
    },
    closeModalUpdateBooking: () => {
      set(state => ({
        editBooking: {
          ...state.editBooking,
          isOpen: false
        }
      }))
    },
  }),
    {
      name: 'bookings-modal',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)