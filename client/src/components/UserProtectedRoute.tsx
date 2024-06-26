import { Navigate } from "react-router-dom";
import { ErrorToast } from '../helpers/formHelper';

interface UserProtectedRouteProps {
    children: React.ReactNode;
}

const UserProtectedRoute = ({ children }: UserProtectedRouteProps): any => {
    if (!localStorage.getItem("token")) {
        ErrorToast("Please login first");
        return <Navigate to="/login" />;
    }

    const userDetailsString: any = localStorage.getItem("UserDetails");

    if (JSON.parse(userDetailsString).role === "USER")
        return children;
        
    return <Navigate to="/menuList" />;


}

export default UserProtectedRoute
