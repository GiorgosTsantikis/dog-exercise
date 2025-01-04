import React from "react"

import logo from '../../assets/logo.svg'
import pin from '../../assets/location-pin.svg'
import '../../css/SidebarNav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from "react-bootstrap";
import { FaHome,FaUser,FaCog, FaComment, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SidebarNav(){
    

    return (

      
        <div id="sidebar-menu" className="sideBarMenuContainer">
        <nav className="sidebar">
          <ul className="navbar-nav">
            <li>
              <Link to="/home">
                <FaHome /> <span className="nav-label">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <FaUser /> <span className="nav-label">Profile</span>
              </Link>
            </li>
            <li>
              <a href="/settings">
                <FaCog /> <span className="nav-label">Settings</span>
              </a>
            </li>
            <li>
              <a href="/messages">
                <FaComments/> <span className="nav-label">Messages</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    )
}

