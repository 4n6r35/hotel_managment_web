import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import AuthPage from "./presentation/pages/auth/auth-page"
import DashboardPage from "./presentation/pages/dashboad/dashboard-page"
import RoomsView from "./presentation/pages/dashboad/components/rooms-view"
import ReservationsView from "./presentation/pages/dashboad/components/reservations-view"
import ManagamentRoomsView from "./presentation/pages/dashboad/components/management-rooms-view"
import DashboardGuard from "./presentation/guards/dashboard-guard"

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
    // children: landingRoutes
  },
  {
    path: "/dashboard",
    element: <DashboardGuard><DashboardPage /></DashboardGuard>,
    children: [
      {
        path: "/dashboard/rooms",
        element: <RoomsView />
      },
      {
        path: "/dashboard/reservations",
        element: <ReservationsView />
      },
      {
        path: "/dashboard/managements-rooms",
        element: <ManagamentRoomsView />
      }
    ]
  },
])

export default function AppRoutes(): JSX.Element {
  return (
    <RouterProvider router={appRoutes}/>
  )
}