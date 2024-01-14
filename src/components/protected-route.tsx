import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    children?: ReactElement;
    isAuthenticated: boolean;
    adminOnly?: boolean;
    admin?: boolean;
    redirect?: string

}
const ProtectedRoute = ({ isAuthenticated,
    adminOnly,
    children,
    admin,
    redirect = "/" }: Props) => {

    if (!isAuthenticated) return <Navigate to={redirect} />

    if (adminOnly && !admin) return <Navigate to="/" />

    return children ? children : <Outlet />
}
export default ProtectedRoute