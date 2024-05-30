import React from 'react'
import { Navigate } from "react-router-dom";
import { ErrorToast } from '../helpers/formHelper';

interface AdminProtectedRouteProps {
    children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps): any => {
    if (!localStorage.getItem("token")) {
        ErrorToast("Please login first");
        return <Navigate to="/login" />;
    }
    
    const userDetailsString: any = localStorage.getItem("UserDetails");
    
    if (JSON.parse(userDetailsString).role === "ADMIN")
        return children;

    return <Navigate to="/" />;
}

export default AdminProtectedRoute