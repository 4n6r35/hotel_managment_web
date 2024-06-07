import { Navigate } from "react-router-dom"
import { AUTH_TOKEN } from "../../core/constants/keys-constans"

export default function DashboardGuard (
  {
	children
}: {
  children: JSX.Element
}): JSX.Element {
  const validationToken: string = localStorage.getItem(AUTH_TOKEN) || ""
  if (validationToken.length === 0) {
    return (
      <Navigate to={"/"}></Navigate>
    )
  }

  return (
    <>{children}</>
  )
}