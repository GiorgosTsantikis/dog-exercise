import { useState } from 'react'
import Heading from './components/Heading';
import AddListing from './components/AddListing';
import Home from './components/Home';
import Listing from './components/Listing';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './RouteRestrictions/ProtectedRoute';
import {Route,Routes,Navigate} from 'react-router-dom';
import { Accordion,AccordionBody,AccordionButton,AccordionHeader,AccordionItem } from 'react-bootstrap';
import './css/App.css'
import AdminRoute from './RouteRestrictions/AdminRoute';
import UsersPage from './components/admin/UsersPage';

function App() {

  const [collapsed,setCollapsed]=useState(true);

  function toggle(e){
    e.stopPropagation();
    setCollapsed(!collapsed);
  }

  return (
    <>


    <Accordion style={{marginTop:"2px"}} >
            <Accordion.Item eventKey="0">
          
            <AccordionHeader onClick={toggle} className={collapsed?"collapsed":"expanded"}
            >Click</AccordionHeader>
          
          
          <Accordion.Body >
            <Heading/>
            </Accordion.Body>
          
        
          </Accordion.Item>
            
        </Accordion>
              
    
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
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Navigate to="/home"/>}/>

        <Route path="/admin/users" element={
        <AdminRoute>
         <UsersPage/>
         </AdminRoute>}/>
    </Routes>
    </>


    

  )
}

export default App
