import { ChangeEvent, FormEvent, useState } from "react";
import { authUseCases } from "../../../../domain/auth-usecases";
import { AuthReigsterParams } from "../../../../data/interfaces/auth-register-params";

export default function AuthRegister({
  setActionType
}: {
  setActionType: () => void;
}): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [formRegister, setFormRegister ] = useState({
    idType: "CC",
    idNumber: "",
    firstName: "",
    firstSurName: "",
    secondName: "",
    secondSurName: "",
    userName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    role: "user"
  })

  function handlerClickSetActionType(): void {
    setActionType();
  }
  
  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formRegister);

    if (
      formRegister.idType === "" ||
      formRegister.idNumber === "" ||
      formRegister.firstName === "" ||
      formRegister.firstSurName === "" ||
      formRegister.secondName === "" ||
      formRegister.secondSurName === "" ||
      formRegister.userName === "" ||
      formRegister.userEmail === "" ||
      formRegister.password === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (formRegister.password !== formRegister.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const registerForm: AuthReigsterParams = {
      id_type: formRegister.idType,
      id_number: formRegister.idNumber,
      first_name: formRegister.firstName,
      second_name: formRegister.secondName,
      first_surname: formRegister.firstSurName,
      second_surname:formRegister.secondSurName,
      username: formRegister.userName,
      email: formRegister.userEmail,
      password: formRegister.password,
      role: formRegister.role
    }

    setLoading(true);
    const response = await authUseCases.userRegister(registerForm)
    setLoading(false);
    if (response) {
      handlerClickSetActionType();
      alert("registro exitoso")
      setFormRegister({
        idType: "",
        idNumber: "",
        firstName: "",
        firstSurName: "",
        secondName: "",
        secondSurName: "",
        userName: "",
        userEmail: "",
        password: "",
        confirmPassword: "",
        role: ""
      })
    } else {
      alert("Error al registrarse")

    }
  }

  const handlerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormRegister({
      ...formRegister,
      [event.target.name]: event.target.value,
    });
  }

  const handleSelectChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormRegister({
      ...formRegister,
      idType: event.target.value,
    });
  }

  const handleSelectChangeRole = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormRegister({
      ...formRegister,
      role: event.target.value,
    });
  }

  return (
    <section className={sectionCss}>
      <form
        className={formCss}
        onSubmit={handlerSubmit}>
        <h1 className={h1Css}>Registro</h1>
        <section
          className={gridFormCss}
          >

          <div className={gridFormSectionCss}>
          <label htmlFor="identificationType">Tipo de ID:</label>
            <select id="identificationType" value={formRegister.idType} onChange={handleSelectChangeType} className={inputCss}>
              <option value="CC">CC</option>
              <option value="NIT">NIT</option>
            </select>
          </div>

          <div className={gridFormSectionCss}>
          <label htmlFor="userRole">Rol:</label>
            <select id="userRole" value={formRegister.role} onChange={handleSelectChangeRole} className={inputCss}>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="idNumber">Número de identificación</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              autoComplete="off"
              type="number"
              required
              placeholder="1234345345"
              min={0}
              name="idNumber"
              id="idNumber"/>          
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="firstName">Primer nombre</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              type="text"
              required
              placeholder="Juanito"
              name="firstName"
              id="firstName"/>
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="firstSurName">Segundo nombre</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              type="text"
              required
              placeholder="De Jesus"
              name="firstSurName"
              id="firstSurName"/>
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="secondName">Primer apellido</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              autoComplete="off"
              type="text"
              required
              placeholder="Gonzales"
              name="secondName"
              id="secondName"/>
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="secondSurName">Segundo Apellido</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              autoComplete="off"
              type="text"
              required
              placeholder="Torrez"
              name="secondSurName"
              id="secondSurName"/>          
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="userName">Nombre de usuario</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              autoComplete="off"
              type="text"
              required
              placeholder="JuaniGonza"
              name="userName"
              id="userName"/>          
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="userEmail">Correo</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              autoComplete="off"
              type="email"
              required
              placeholder="example@example.com"
              name="userEmail"
              id="userEmail"/>          
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="password">Contraseña</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              type="password"
              required
              placeholder="•••••••••"
              name="password"
              id="password"/>
          </div>

          <div className={gridFormSectionCss}>
            <label className={labelCss} htmlFor="confirmPassword">Confirma contraseña</label>
            <input
              className={inputCss}
              onChange={handlerOnChange}
              type="password"
              required
              placeholder="•••••••••"
              name="confirmPassword"
              id="confirmPassword"/>
          </div>
        </section>
        <button
          type="button"
          className={buttonChangeAction}
          onClick={handlerClickSetActionType}
          >
          ¿Ya tienes una cuenta?
        </button>

        <button
          className={buttonSubmitCss}
          type="submit">
            {loading ? "Cargando...": "Resgistrarme"}
        </button>
      </form>
    </section>
  )
}
const sectionCss: string = "bg-white rounded-lg overflow-hidden"
const h1Css: string = "text-[1.3rem] font-medium text-center pb-[10px]";
const formCss: string = "w-[600px] h-auto p-[20px_30px] rounded-[5px] flex flex-col gap-[10px]";
const labelCss: string = "block";
const inputCss: string = "w-full h-[3rem] p-[10px] border border-gray-400 rounded-[5px] col-span-1";
const gridFormCss: string = "w-full grid grid-cols-2 gap-5";
const buttonSubmitCss: string = "w-[50%] self-center p-[10px_10px] border border-black rounded-[5px] bg-black text-white cursor-pointer";
const buttonChangeAction: string = "place-self-center max-w-max border-none outline-none p-[5px_0] hover:underline underline-offset-8";
const gridFormSectionCss: string = "flex flex-col gap-2.5";

