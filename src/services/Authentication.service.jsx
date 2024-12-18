import { jwtDecode } from "jwt-decode";

export function isAdmin(token){
    try{
       const decodedToken=jwtDecode(token);
       const roles=decodedToken.role;
       if(roles.includes("ROLE_ADMIN")) return true;
       return false;
    }catch(error){
        console.log(error);
    }
    return false;
}
