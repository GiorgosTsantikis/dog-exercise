import React, { useEffect,useState } from "react";
import '../css/Home.css';
import ListingCard from "./ListingCard";
import axios from 'axios';
import { Container } from "react-bootstrap";
import {getListings} from "../services/ApiCalls";

export default function Home(){

    const[listings,setListings]=useState(null)

    useEffect( ()=>{
        async function fetch(){
        const response=await getListings();
        //setListing(response.data);
        console.log(response.data);
        setListings(response.data);
        }
        fetch()

    },[])


    if(!listings){
        return <div>Loading</div>
    }
    return(
        <Container className="py-4">
            <div className="row">
                {listings.map((item,index)=>(
                    <div className="col-md-4" key={index}>
                    <ListingCard listing={item}  key={index}/>
                    </div>

                ))}
            </div>
        </Container>
        
    )
}