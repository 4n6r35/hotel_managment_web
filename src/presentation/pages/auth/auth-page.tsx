import { CSSProperties, useState } from "react";
import AuthLogin from "./components/auth-login";
import AuthRegister from "./components/auth-register";

export default function AuthPage(): JSX.Element {
  const [actionType, setActionType] = useState(true);

  return (
    <main
      style={mainCss}>
      {
        actionType
        ? <AuthLogin
            setActionType={() => {setActionType(value => !value);}}
          />

        : <AuthRegister
            setActionType={() => {setActionType(value => !value);}}
          />
      }
    </main>
  )
}

  const mainCss: CSSProperties = {
    width: "100vw",
    height: "100vh",
    display: "grid",
    padding: "10px",
    placeItems: "center",
  }
