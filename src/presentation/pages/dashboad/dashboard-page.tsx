import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { roomModalZustand } from "../../zustand/room-modal-zustand"
import DashboardAside from "./components/dasboard-aside"
import ModalCreateRoom from "./components/modal-create-room"
import ModalUpdateRoom from "./components/modal-update-room"
import { bookingModalZustand } from "../../zustand/booking-modal-zustand"
import ModalCreateBooking from "./components/modal-create-booking"
import ModalUpdateBooking from "./components/modal-update-booking"

export default function DashboardPage(): JSX.Element {
  const isOpenCreateRoomModal = roomModalZustand(state => state.createRoom)
  const isOpenUpdateRoomModal = roomModalZustand(state => state.editRoom.isOpen)
  const isOpenCreateBookingModal = bookingModalZustand(state => state.createBooking.isOpen)
  const isOpenUpdateBookingModal = bookingModalZustand(state => state.editBooking.isOpen)

  const openModal = roomModalZustand(state => state.tooggleModalRoomCreate)
  const navigation = useNavigate()

  const handlerClickCreateRoom = () => {
    openModal()
  }

  useEffect(() => {
    navigation("/dashboard/rooms")
  }, [navigation])

  return (
    <main className={mainCss}>
      <nav className={navCss}>
        <h1 className={navH1Css}>Hotel Managment</h1>
        <button className={actionsButtonsCreateCss} onClick={handlerClickCreateRoom}>Crear Habitación</button>
      </nav>
      <section className={sectionCss}>
      <div className={divCss}>
        <DashboardAside />
        <main className={divMainCss}>
          <Outlet />
        </main>
      </div>
      </section>

      {isOpenCreateRoomModal.isOpen
        ? <ModalCreateRoom/>
        : null
      }

      {
        isOpenUpdateRoomModal
          ? <ModalUpdateRoom />
          : null
      }

      {
        isOpenCreateBookingModal
          ? <ModalCreateBooking />
          : null
      }

      {
        isOpenUpdateBookingModal
          ? <ModalUpdateBooking />
          : null
      }
    </main>
  )
}

const mainCss: string = "w-crenn h-[100dvh] flex flex-col overflow-hidden"
const sectionCss: string = "flex-1"
const navCss: string = "min-h-[70px] flex items-center justify-between px-3 bg-white border"
const navH1Css: string = "font-bold text-xl"
const divCss: string = "flex"
const divMainCss: string = "flex-1"
const actionsButtonsCreateCss: string = "h-10 px-2.5 bg-slate-900 text-white text-sm rounded"