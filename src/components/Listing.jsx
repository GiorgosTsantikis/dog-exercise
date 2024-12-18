import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import house from "../assets/house.jpg";
import '../css/Listing.css';
import axios from 'axios';
import {getListing} from '../services/ApiCalls'

export default function Listing(){

    const[listing,setListing]=useState(null);

    const {id}=useParams();

     useEffect( ()=>{
        async function fetch(){
        const response=await getListing(id);
        //setListing(response.data);
        console.log(response.data);
        setListing(response.data);
        }
        fetch()

    },[id])



    if(!listing){
        return <div>loading</div>
    }
    return (
        <div className="container-div">
        <section className="card" style={{width:"120vh"}} >
            <img src={house} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{listing.name}</h5>
                 <p className="card-text">{listing.city}, {listing.state}</p>

            </div>
        </section>
        </div>
    )

}