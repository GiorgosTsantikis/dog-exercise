import { useState } from 'react'
import Heading from './components/Heading';
import addListing from './components/addListing';
import Home from './components/Home';
import Listing from './components/Listing';
import {Route,Routes,Link, BrowserRouter} from 'react-router-dom';
import './css/App.css'

function App() {

  return (
    <>
    <Heading/>
    <div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/listing/:id" element={<Listing/>}/>
      <Route path="/addListing" element={<addListing/>}/>
    </Routes>

    </div>
    </>
  )
}

export default App
