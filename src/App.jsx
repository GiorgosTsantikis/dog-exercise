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
import Menu from './components/menu/menu';
import AdminRoute from './RouteRestrictions/AdminRoute';
import UsersPage from './components/admin/UsersPage';
import Messages from './components/message-page/Messages';
import PrivateChat from './components/message-page/PrivateChat';
import log from './services/logger';
import { ToastContainer, toast } from "react-toastify";
import { onMessage } from './services/MessagingService';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  let debounceTimeout;
  if(!document.getElementsByTagName("html")[0].getAttribute("data-theme")){
    if(!sessionStorage.getItem("theme")){
      document.documentElement.setAttribute("data-theme","light");
    }else{
      document.documentElement.setAttribute("data-theme",sessionStorage.getItem("theme"));
    }
  }
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

    
  
    function handleNewMessage(evt){
      console.log("received msg ",evt);
      toast(
 <>
      <div>
        <strong>From:</strong><em>{`${evt.detail.senderId}`}</em>
      </div><div>{`${evt.detail.content}`}</div></>);
    }

  

  useEffect(()=>{
    const unsubscribe=onMessage(handleNewMessage);
    async function keycloakInit(){
      //const keycloak=getKeycloakInstance();
      log.debug("App.useEffect keycloakInit");
      
    }
    //keycloakInit();
    return unsubscribe;
  },[]);

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


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

      <Route path="/menu/:id" element={
          <Menu/>//remove after its done navigate this from stores page
      }/>
      
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
          <ProtectedRoute>
            <Messages/> 
          </ProtectedRoute>
        }/>

        <Route path="/chat/:id" element={
          <ProtectedRoute>
            <PrivateChat/>
          </ProtectedRoute>
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
