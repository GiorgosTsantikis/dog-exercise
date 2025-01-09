import { jwtDecode } from "jwt-decode";
import { getKeycloakInstance } from "./KeycloakService";
import applicationLogger from "./logger";

export function isAdmin(){
    try{
        const keycloak=getKeycloakInstance();
       const roles=keycloak.resourceAccess["spring-boot-app"];       
       if(roles.roles.includes("ROLE_ADMIN")) return true;
       return false;
    }catch(error){
        applicationLogger.error(error);
    }
    return false;
}
