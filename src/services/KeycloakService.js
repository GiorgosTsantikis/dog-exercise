import Keycloak from "keycloak-js";
import { redirect } from "react-router-dom";
import applicationLogger from "./logger";
import { initializeMessages, updateToken } from "./MessagingService";


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
    });

    export const getKeycloakInstance = () => {
    
        if(keycloak)
            return keycloak;
    };

try{
    const authenticated=await keycloak.init({ onLoad:'check-sso',flow:'hybrid',enableLogging:true})
    .then(async ()=>{
        await setUserInfo();
        await initializeMessages();
    });
    
    
}catch(error){console.log(error)}

export async function setUserInfo(){
    await keycloak.loadUserInfo()
        .then(userInfo=>{
            sessionStorage.setItem("userId",userInfo['sub']);
            sessionStorage.setItem("username",userInfo['username']);
        });
}



export  function isTokenExpired(){
    applicationLogger.debug("KeycloakService.isTokenExpired()");
        if(keycloak.isTokenExpired(300)){
            applicationLogger.debug("KeycloakService.isTokenExpired() true");
            return true;
        }
        return false;
}

export async function refreshToken(){
    try{
           keycloak.updateToken().then(refreshed=>{
            applicationLogger.debug("KeycloakService.refreshToken UPDATED TOKEN SUCCESSFULLY",keycloak.token);
            updateToken(keycloak.token)});
    }catch(err){
        applicationLogger.error("KeycloakService.refreshToken error updating token",err);
    }
}




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

export async function getUserId(){

}


