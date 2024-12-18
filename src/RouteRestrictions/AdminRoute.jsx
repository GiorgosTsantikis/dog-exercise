import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { isAdmin } from "../services/Authentication.service";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Check for a JWT in localStorage
    if(isAdmin(token)){
        return children;
    }
    return <Navigate to="/login"/>
   //return children;
};

export default AdminRoute;