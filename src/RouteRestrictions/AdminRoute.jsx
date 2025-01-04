import { isAdmin } from "../services/Authentication.service";

const AdminRoute = ({ children }) => {
    
    
    if(isAdmin()){
        console.log('YES');
        
        return children;
    }
   //return children;
};

export default AdminRoute;