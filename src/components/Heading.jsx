import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
export default function Heading(){

    return (

        <header>
            <Link to="/">
            <img className="brand-logo" src={logo}/>
            </Link>
        </header>

    )
}