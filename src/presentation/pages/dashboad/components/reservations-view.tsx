import { useEffect, useState } from "react"
import { Booking } from "../../../../data/models/booking-model"
import { bookingsUseCases } from "../../../../domain/bookings-usecases"
import { bookingModalZustand } from "../../../zustand/booking-modal-zustand"

export default function ReservationsView(): JSX.Element {
  const [bookings, setBookigs] = useState<Booking[]>([])
  const  updateBooking = bookingModalZustand(state => state.openModalUpdateBooking)

  const fetchBookings = async () => {
    const response = await bookingsUseCases.getBookings({page: 1, size: 20})
    setBookigs(response)
  }

  const handlerClickDeleteBooking = async (idBooking: number) => {
    const response = await bookingsUseCases.deleteBooking({ idBooking: idBooking })
    if (response) {
      fetchBookings()
      alert("Se ha borrado la reserva de forma exitosa.")
      return
    }

    alert("No tienes permiso para relaizar esta acción.")
  }

  const handlerClickUpdateRoom = (booking: Booking) => {
    updateBooking(booking)
  }

  useEffect(() => {
    fetchBookings()
  }, [])
  return (
    <main className={mainCss}>
      <header className={headerCss}>
        { roomsTableHeader.map((head, index) => {
          return (
            <span key={index} className={headCss}>{head}</span>
          )
        })}
      </header>
      <ul className={ulCss} style={{scrollbarWidth: "thin"}}>
        {bookings.map((booking, index) => {
          return (
            <li key={index} className={liCss}>
              <span>{booking.id_user}</span>
              <span>{`${booking.entry_date}`}</span>
              <span>{`${booking.exit_date}`}</span>
              <span>{`${booking.state}`}</span>
              <span className={spanActiosCss}>
                <button className={buttonActionsCss} onClick={() => handlerClickUpdateRoom(booking)}>editar</button>
                <button className={buttonActionsDeleteCss} onClick={() => handlerClickDeleteBooking(booking.id_booking!)}>eleminar</button>
              </span>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

const mainCss: string = "w-full h-full bg-white"
const headerCss: string = "w-full h-12 grid grid-rows-1 grid-cols-5 border-b"
const headCss: string = "grid place-items-center pb-1 capitalize text-sm font-semibold"
const ulCss: string = "w-full h-[calc(100dvh_-_120px)] flex flex-col overflow-y-auto"
const liCss: string = "w-full grid grid-rows-1 grid-cols-5 justify-items-center place-items-center text-sm py-4 border-b hover:bg-gray-50 transition-all group"
const spanActiosCss: string = "flex gap-2.5 font-semibold"
const buttonActionsCss: string = "hover:underline underline-offset-4 h-8 px-2 bg-slate-100"
const buttonActionsDeleteCss: string = "hover:underline underline-offset-4 h-8 px-2 hover:text-red-500 bg-slate-100"

const roomsTableHeader = [
  "Id del usuario",
  "Fecha de entrada",
  "Fecha de salida",
  "status",
  "acciones"
]