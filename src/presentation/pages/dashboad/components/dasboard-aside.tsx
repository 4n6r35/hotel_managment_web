import { Link } from "react-router-dom"
import { ASIDE_LINKS } from "../../../../core/data/aside-links-data"
import { useState } from "react"
import { LogOut } from "lucide-react"
import { AUTH_TOKEN } from "../../../../core/constants/keys-constans"
import { useNavigate } from "react-router"

export default function DashboardAside(): JSX.Element {
  const [linkActive, setLinkActive] = useState("rooms")
  const navigate = useNavigate()
  const handlerClickCloseSession = () => {
    localStorage.removeItem(AUTH_TOKEN)
    navigate("/")
  }
  
  return (
    <aside className={asideCsss}>
      <section className={sectionCss}>
        <div className={sectionDivCss}>
          {ASIDE_LINKS.map((link, index) => {
            return (
              <Link
                onClick={() => setLinkActive(link.linkActive)}
                key={index}
                to={link.href}
                className={linkActive === link.linkActive ? linkActiveCss : linkCss }>
                  <i>{link.icon}</i>
                  <span>{link.name}</span>
              </Link>
            )
          })}
        </div>
        <button
          onClick={handlerClickCloseSession}
          className={buttonCss}>
            <i><LogOut/></i>
            <span>Cerrar sesión</span>
        </button>
      </section>
    </aside>
  )
}

const asideCsss: string = "hidden md:block w-[200px] h-[calc(100dvh_-_70px)] p-2.5 border-r bg-white"
const sectionCss: string = "w-full h-full flex flex-col justify-between"
const sectionDivCss: string = "w-full h-full flex flex-col gap-2.5"
const linkCss: string  = "w-full flex gap-3 items-center p-3 hover:bg-gray-100 rounded-lg transition-colors duration-300"
const linkActiveCss: string = "w-full flex gap-3 items-center p-3 bg-gray-200 rounded-lg transition-colors duration-300"
const buttonCss: string = "w-full flex gap-3 items-center p-3 hover:bg-gray-100 rounded-lg border-none outline-none transition-colors duration-300"