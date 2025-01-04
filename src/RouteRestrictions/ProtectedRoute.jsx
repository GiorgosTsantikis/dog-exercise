import React from "react";
import { Navigate } from "react-router-dom";
import { getKeycloakInstance,login } from "../services/KeycloakService";

import  { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const keycloak = getKeycloakInstance();
        

        if (keycloak) {
            // Check if the user is authenticated
            if (keycloak.authenticated) {
                setAuthenticated(true);
            } else {
                // Redirect to Keycloak login page if not authenticated
                login();
            }
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading until the authentication state is checked
    }
    
    return authenticated ? children : null; // Render the children if authenticated, else return null
    //return children;
};


export default ProtectedRoute;
