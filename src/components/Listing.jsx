import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Listing(){

    const {id}=useParams();

    useEffect(()=>{
        
    })




    return (
        <div>listing :{id}</div>
    )
}