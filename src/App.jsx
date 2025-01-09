import { useEffect, useState } from 'react'
import Heading from './components/static-page-assets/Heading';
import AddListing from './components/AddListing';
import Home from './components/Home';
import Listing from './components/Listing';
import Profile from './components/Profile';
import ProtectedRoute from './RouteRestrictions/ProtectedRoute';
import {Route,Routes,Navigate} from 'react-router-dom';
import { Accordion,AccordionBody,AccordionButton,AccordionHeader,AccordionItem } from 'react-bootstrap';
import './css/App.css'
import SidebarNav from './components/static-page-assets/SidebarNav';
import AdminRoute from './RouteRestrictions/AdminRoute';
import UsersPage from './components/admin/UsersPage';
import { getKeycloakInstance } from './services/KeycloakService';
import Messages from './components/message-page/Messages';
import log from './services/logger';


function App() {

  let debounceTimeout;
  document.documentElement.setAttribute("data-theme","light");
  const random="";
  const [collapsedTopAccordion,setCollapsedTopAccordion]=useState(true);
  const [collapsedSideAccordion,setCollapsedSideAccordion]=useState(true);
  const [activeKey, setActiveKey]=useState("1");
  const [isHovering,setIsHovering]=useState(false);

/*
  function toggleTopAccordion(e){
    e.stopPropagation();
    setCollapsedTopAccordion(!collapsedTopAccordion);
}
 */

 // Track active accordion item key

  // Function to toggle accordion on click
  function toggleTopAccordion() {
    // Toggle between "0" (closed) and "1" (open)
    setActiveKey(activeKey === "0" ? "1" : "0");
  }

  // Expand accordion on hover
  function openAccordion() {
    
      
        setIsHovering(true);
        setActiveKey("0");
      
    
  }

  // Collapse accordion on mouse leave
  function closeAccordion() {
    
        setIsHovering(false);
        setActiveKey("1");
    
    }
  
 

  

  useEffect(()=>{
    async function keycloakInit(){
      const keycloak=getKeycloakInstance();
      log.debug("keycloak token",keycloak.token);
      
    }
    keycloakInit();
  },[]);

  return (
    <>


    <Accordion style={{marginTop:"2px"}}  
    activeKey={activeKey} 
    onMouseEnter={openAccordion} 
    onMouseLeave={closeAccordion}
               >
            <Accordion.Item eventKey="0" onMouseLeave={closeAccordion}>         
              <AccordionHeader className='expanded'  
              
              //className={ activeKey==="1" ? "collapsed" : "expanded" }
              >
              Click
              </AccordionHeader>
              <Accordion.Body >
                <Heading/>
              </Accordion.Body>             
            </Accordion.Item>           
    </Accordion>

    
  <SidebarNav/>



              
    


    <Routes>
      
      <Route path="/home" element={
       <ProtectedRoute>
        <Home/>
       </ProtectedRoute> 
        }/>
      <Route path="/listing/:id" element={
        <ProtectedRoute>
          <Listing/>
        </ProtectedRoute>
        }/>
      <Route path="/addListing" element={
            <ProtectedRoute>
        <AddListing/>
        </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>

        <Route path="/messages" element={
         
            
            <Messages/>
           
           
        }/>

        <Route path="*" element={<Navigate to="/home"/>}/>

        <Route path="/admin/users" element={
        <AdminRoute>
         <UsersPage/>
         </AdminRoute>}/>
    </Routes>
    </>


    

  )
}

export default App;
