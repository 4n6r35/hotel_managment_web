import { FormEvent, useState } from "react";
import { authUseCases } from "../../../../domain/auth-usecases";
import { useNavigate } from "react-router";

export default function AuthLogin({
  setActionType
}: {
  setActionType: () => void;
}): JSX.Element {
  const [loading, setloading] = useState(false);
  const navigation = useNavigate()
  const [authForm, setAuthForm ] = useState({
    userEmail: "",
    userPassword: ""
  });

  const hnadlerOnChange = (event: FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.target as HTMLInputElement;

    setAuthForm({
     ...authForm,
      [name]: value
    });
  }

  const handlerClickSetActionType = (): void => {
    setActionType();
  }

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setloading(true);
    
    const response = await authUseCases.userLogin({
      userEmail: authForm.userEmail,
      userPassword:  authForm.userPassword
    })

    if (response) {
      setloading(false);
      setAuthForm({
        userEmail: "",
        userPassword: ""
      });
      navigation("/dashboard")

    } else {
      setloading(false);
      alert("Revice las crendenciales")
    }
  }

  return (
    <section className={sectionCss}>
      <form
        className={formCss}
        onSubmit={handlerSubmit}>
        <h1 className={h1Css}>Iniciar sesión</h1>
        
        <label className={labelCss} htmlFor="userEmail">Correo</label>
        <input
          className={inputCss}
          onChange={hnadlerOnChange}
          autoComplete="off"
          type="email"
          required
          placeholder="Email"
          name="userEmail"
          id="userEmail"/>

        <label className={labelCss} htmlFor="userPassword">Contraseña</label>
        <input
          className={inputCss}
          onChange={hnadlerOnChange}
          type="password"
          required
          placeholder="Contraseña"
          name="userPassword"
          id="userPassword"/>

        <button
          type="button"
          className={buttonChangeAction}
          onClick={handlerClickSetActionType}
          >
          ¿No tienes una cuenta?
        </button>

        <button
          className={buttonSubmitCss}
          type="submit">
            {loading ? "Cargando...": "Entrar"}
        </button>
      </form>
    </section>
  )
}

const sectionCss: string = "bg-white rounded-lg overflow-hidden" 
const formCss: string = "w-80 h-auto border p-5 flex flex-col gap-2.5";
const h1Css: string = "text-lg font-medium text-center pb-2.5";
const labelCss: string = "block";
const inputCss: string = "w-full h-12 p-2.5 border border-gray-400 rounded";
const buttonChangeAction: string = "border-none outline-none p-1.5 hover:underline underline-offset-8";
const buttonSubmitCss: string = "w-7/12 self-center p-2.5 border border-black rounded bg-black text-white cursor-pointer";

