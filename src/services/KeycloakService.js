import Keycloak from "keycloak-js";
import { redirect } from "react-router-dom";


const keycloakUrl=import.meta.env.VITE_KEYCLOAK_URL;
const clientSecret=import.meta.env.VITE_CLIENT_SECRET;
const realm=import.meta.env.VITE_KEYCLOAK_REALM;
const clientId=import.meta.env.VITE_CLIENT_ID;
const redirectUri=import.meta.env.VITE_REDIRECT_URI;
console.log(keycloakUrl);
const  keycloak = new Keycloak({
        url: `${keycloakUrl}`, // Keycloak server URL
        realm: `${realm}`, // Your realm
        clientId: `${clientId}`,
       credentials:{
            secret:`${clientSecret}`
        } // Your client ID
    });

try{
    const authenticated=await keycloak.init({ onLoad:'login-required',flow:'hybrid',enableLogging:true})
    
}catch(error){console.log(error)}



export const getKeycloakInstance = () => {
    
    if(keycloak)
        return keycloak;
};

export const logout = () => {
    if (keycloak) {
        keycloak.logout({
            redirectUri: window.location.origin,
        });
    }
};

export const login = () => {
    if (keycloak) {
        keycloak.login({
            redirectUri: `${redirectUri}`
        }); // This triggers the redirect to Keycloak login page
    }
};


