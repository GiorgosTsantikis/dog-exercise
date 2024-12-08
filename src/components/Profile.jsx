import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Profile(){

    const token=localStorage.getItem("token");
    const [user,setUser]=useState(null);

    useEffect(()=>{
    async function fetch(){
        console.log(token," token");
        axios.get('http://localhost:8080/auth/users/profile',{
            headers:{Authorization:`Bearer ${token}`}
        })
        .then((response)=>{
            console.log(response);
            setUser(response.data)
        })
        .catch(error=>console.log(error));
    }
    fetch()
    } 
    ,[token])

    if(!user) return <div>Loading!</div>;

    return (
        <div>{user.username}</div>
    )
}