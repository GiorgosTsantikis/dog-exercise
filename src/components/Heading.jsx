import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import logo from '../assets/logo.svg'
import { Button } from "react-bootstrap"
export default function Heading(){

    
    const{theme,toggleTheme}=useContext(ThemeContext);
    

    const navigate=useNavigate();
    function handleLogout(evt){
        console.log("logout");
        
        localStorage.removeItem("token");
    }

    return (

        <nav className="navbar navbar-expand-sm  ">
            <div className="container-fluid">
            <Link to="/home">
    <img className="navbar-brand" src={logo}/>
           </Link>
           <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
           <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/addListing">Add Listing</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>


                <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/login">Log-out</Link>
                </li>
                <li className="nav-item">
                <Button className="nav-link" onClick={toggleTheme}>Theme</Button>
                </li>
                
            </ul>
            
           </div>
            
            </div>
        </nav>

    )
}