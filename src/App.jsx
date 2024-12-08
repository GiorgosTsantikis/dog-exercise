import { useState } from 'react'
import Heading from './components/Heading';
import AddListing from './components/addListing';
import Home from './components/Home';
import Listing from './components/Listing';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import {Route,Routes,Link, BrowserRouter} from 'react-router-dom';
import './css/App.css'

function App() {

  return (
    <>
              <Heading/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/listing/:id" element={<Listing/>}/>
      <Route path="/addListing" element={
            <ProtectedRoute>
        <AddListing/>
        </ProtectedRoute>
        }/>
        <Route path="/profile/:id" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    </>


    

  )
}

export default App
