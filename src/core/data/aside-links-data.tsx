import { Bed, CalendarCheck } from "lucide-react";
import { AsideLink } from "../interfaces/aside-links-interface";

export const ASIDE_LINKS: AsideLink[] = [
  {
    href: "/dashboard/rooms",
    name: "Habitaciones",
    linkActive: "rooms",
    icon: <Bed />
  },
  {
    href: "/dashboard/reservations",
    name: "Reservas",
    linkActive: "reservations",
    icon: <CalendarCheck />

  },
  // {
  //   href: "dashboard/managements-rooms",
  //   name: "Gestión de habitaciones",
  //   linkActive: "managements-rooms"
  // },
]