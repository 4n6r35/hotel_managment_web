import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { roomsUseCases } from "../../../../domain/rooms-usecases";
import { roomModalZustand } from "../../../zustand/room-modal-zustand";

export default function ModalCreateRoom (): JSX.Element {
  const [loading, setloading] = useState(false);
  const closeModal = roomModalZustand(state => state.tooggleModalRoomCreate)
  const [createRoomForm, setCreateRoomForm ] = useState({
    number: "",
    type: "",
    value: ""
  });

  const handlerClickCloseModal = () => {
    closeModal()
  }

  const hnadlerOnChange = (event: FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.target as HTMLInputElement;

    setCreateRoomForm({
     ...createRoomForm,
      [name]: value
    });
  }

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    console.log(createRoomForm)

    if (createRoomForm.number === "0") {
      alert("El número de habitación no puede ser 0");
      return
    }

    if (createRoomForm.type === "") {
      alert("El tipo de habitación no puede estar vacío");
      return
    }

    if (createRoomForm.value === "0") {
      alert("El valor de la habitación no puede ser 0");
      return
    }

    setloading(true);
    const response = await roomsUseCases.createRoom({
      number: Number( createRoomForm.number),
      type: createRoomForm.type,
      value: Number(createRoomForm.value),
    })

    if (response) {
      setloading(false);
      setCreateRoomForm({
        number: "",
        type: "",
        value: ""
      })
      closeModal()
      window.location.reload()
      
    } else {
      setloading(false);
      alert("El rol no tiene permiso para relizar esta acción")
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
        <h1 className={h1Css}>Crear habitación</h1>
        
        <label className={labelCss} htmlFor="number">Número de habitación</label>
        <input
          className={inputCss}
          onChange={hnadlerOnChange}
          autoComplete="off"
          type="number"
          required
          placeholder="3432"
          min={0}
          name="number"
          id="number-room"/>

        <label className={labelCss} htmlFor="type">Tipo de habitación</label>
        <input
          className={inputCss}
          onChange={hnadlerOnChange}
          autoComplete="off"
          type="text"
          required
          placeholder="Duplex"
          name="type"
          id="type-room"/>

        <label className={labelCss} htmlFor="value">Precio de la habitación</label>
        <input
          className={inputCss}
          onChange={hnadlerOnChange}
          type="number"
          required
          placeholder="34000"
          min={0}
          name="value"
          id="value"/>
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


