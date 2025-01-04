import { jwtDecode } from "jwt-decode";
import { getKeycloakInstance } from "./KeycloakService";

export function isAdmin(){
    try{
        const keycloak=getKeycloakInstance();
       const roles=keycloak.resourceAccess["spring-boot-app"];
       console.log(roles," rolesss");
       
       if(roles.roles.includes("ROLE_ADMIN")) return true;
       return false;
    }catch(error){
        console.log(error);
    }
    return false;
}
