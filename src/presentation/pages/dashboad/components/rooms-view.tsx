import { useEffect, useState } from "react"
import { Room } from "../../../../data/models/rooms-model"
import { roomsUseCases } from "../../../../domain/rooms-usecases"
import { formatPriceToCurrency } from "../../../../core/helpers/format-price-helper"
import { roomModalZustand } from "../../../zustand/room-modal-zustand"
import { bookingModalZustand } from "../../../zustand/booking-modal-zustand"

export default function RoomsView(): JSX.Element {
  const [rooms, setRooms] = useState<Room[]>([])
  const  updateRoom = roomModalZustand(state => state.tooggleModalRoomUpdate)
  const openModalBooking = bookingModalZustand(state => state.tooggleModalCreateBooking)

  const handlerClickCreateBooking = (id_room: number) => {
    openModalBooking(id_room)
  }
  const fetchRooms = async () => {
    const response = await roomsUseCases.getRooms({page: 1, size: 20})
    setRooms(response)
  }

  const handlerClickDeleteRoom = async (idRoom: number) => {
    const response = await roomsUseCases.deleteRoom({ idRoom })
    if (response) {
      fetchRooms()
      alert("Se ha borrado la hatación de forma exitosa.")
      return
    }

    alert("No tienes permiso para relaizar esta acción.")
  }

  const handlerClickUpdateRoom = (room: Room) => {
    updateRoom(room)
  }

  useEffect(() => {
    fetchRooms()
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
        {rooms.map((room, index) => {
          return (
            <li key={index} className={liCss}>
              <span>{room.number}</span>
              <span>{room.type}</span>
              <span>{formatPriceToCurrency(room.value)}</span>
              <span>{`${room.state}`}</span>
              <span>{`${room.is_available}`}</span>
              <span className={spanActiosCss}>
                <button className={buttonActionsCss} onClick={() => handlerClickCreateBooking(room.id_room)}>reservar</button>
                <button className={buttonActionsCss} onClick={() => handlerClickUpdateRoom(room)}>editar</button>
                <button className={buttonActionsDeleteCss} onClick={() => handlerClickDeleteRoom(room.id_room!)}>eleminar</button>
              </span>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

const mainCss: string = "w-full h-full bg-white"
const headerCss: string = "w-full h-12 grid grid-rows-1 grid-cols-6 border-b"
const headCss: string = "grid place-items-center pb-1 capitalize text-sm font-semibold"
const ulCss: string = "w-full h-[calc(100dvh_-_120px)] flex flex-col overflow-y-auto"
const liCss: string = "w-full grid grid-rows-1 grid-cols-6 justify-items-center place-items-center text-sm py-4 border-b hover:bg-gray-50 transition-all group"
const spanActiosCss: string = "flex gap-2.5 font-semibold"
const buttonActionsCss: string = "hover:underline underline-offset-4 h-8 px-2 bg-gray-100"
const buttonActionsDeleteCss: string = "hover:underline underline-offset-4 h-8 px-2 bg-gray-100 hover:text-red-500"

const roomsTableHeader = [
  "número de habitación",
  "tipo de habitación",
  "precio",
  "disponibilida",
  "status",
  "acciones"
]