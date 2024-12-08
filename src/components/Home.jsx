import React, { useEffect,useState } from "react";
import '../css/Home.css';
import ListingCard from "./ListingCard";
import axios from 'axios';
import { Container } from "react-bootstrap";

export default function Home(){

    const[listings,setListings]=useState(null)

    useEffect( ()=>{
        async function fetch(){
        const response=await axios.get(`/api/listings`
            ,{headers:{"Content-Type":"application/json"},});
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
                    <ListingCard listing={item}  />
                    </div>

                ))}
            </div>
        </Container>
        
    )
}