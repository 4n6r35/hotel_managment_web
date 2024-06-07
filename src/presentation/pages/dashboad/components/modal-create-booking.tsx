import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { bookingModalZustand } from "../../../zustand/booking-modal-zustand";
import { bookingsUseCases } from "../../../../domain/bookings-usecases";

export default function ModalCreateBooking (): JSX.Element {
  const [loading, setloading] = useState(false);
  const closeModal = bookingModalZustand(state => state.tooggleModalCreateBooking)
  const id_room = bookingModalZustand(state => state.createBooking.idRoom)
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handlerClickCloseModal = () => {
    closeModal(0)
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    validateDates(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    validateDates(startDate, e.target.value);
  };

  const validateDates = (start: string, end: string) => {
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (start && startDate < today) {
      alert('La fecha de inicio no puede ser menor que la fecha actual.');
      setStartDate("")
    } else if (start && end && startDate > endDate) {
      alert('La fecha de inicio debe ser anterior a la fecha de finalización.');
      setEndDate("")
    }
  };

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (startDate === "" ) {
      alert("La fecha de inicio no puede estar vacía");
      return
    }

    if (endDate === "" ) {
      alert("La fecha de finalización no puede estar vacía");
      return
    }

    setloading(true);
    const response  = await bookingsUseCases.createBooking({id_room, entry_date: startDate, exit_date: endDate});
    if (response) {
      setloading(false);
      setEndDate("")
      setStartDate("")
      closeModal(0)
      window.location.reload()
      
    } else {
      setloading(false);
      alert("Error al crear la reserva")
    }
  }
  return (
    <section className={sectionMainCss}>
      <main className={mainFormCss}>
      <button className={closeButton} onClick={handlerClickCloseModal}>
        <X />
      </button>
      <form
        className={formCss}
        onSubmit={handlerSubmit}>
        <h1 className={h1Css}>Crear reserva</h1>
        
        <label className={labelCss} htmlFor="enter-date">Fecha de entrada</label>
        <input
          className={inputCss}
          onChange={handleStartDateChange}
          type="date"
          value={startDate}
          required
          name="enter-date"
          id="enter-date"/>

        <label className={labelCss} htmlFor="exit-date">Fecha de salida</label>
        <input
          className={inputCss}
          onChange={handleEndDateChange}
          type="date"
          value={endDate}
          required
          name="exit-date"
          id="exit-date"/>

        <button
          className={buttonSubmitCss}
          type="submit">
            {loading ? "Cargando...": "Crear"}
        </button>
      </form>
      </main>
    </section>
  )
}

const sectionMainCss: string = "absolute top-0 left-0 w-screen h-screen grid place-content-center bg-black bg-opacity-50"
const formCss: string = "w-80 h-auto border p-5 flex flex-col gap-2.5 bg-white rounded";
const h1Css: string = "text-lg font-medium text-center pb-2.5";
const labelCss: string = "block";
const inputCss: string = "w-full h-12 p-2.5 border border-gray-400 rounded";
const buttonSubmitCss: string = "w-7/12 self-center p-2.5 mt-2 border border-black rounded bg-black text-white cursor-pointer";
const closeButton: string = "absolute top-2.5 right-2.5 p-2 rounded hover:bg-gray-200 hover:bg-opacity-50"
const mainFormCss: string = "relative"
