import React, { useEffect, useState } from 'react';
import {getProfile,getProfilePic} from '../services/ApiCalls';
import { Card, Col, Container, Image,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Profile.css';
import ProfileModal from './ProfileModal';


export default function Profile(){

    const [user,setUser]=useState(null);
    const[profilePicPopup,setProfilePicPopup]=useState(false);

    const toggleProfilePicpopup=()=>{
        setProfilePicPopup(!profilePicPopup);
    }

    useEffect(()=>{
    async function fetch(){
        const response=await getProfile();
        var pic="data:image/jpeg;base64,";
        const picBase64=await getProfilePic();
        console.log(picBase64);
        if(picBase64){
            let result=pic.concat(picBase64.data);
            console.log(pic);
            setUser({...response.data,photo:result});
        }else{
            setUser({...response.data});
        }
       
        console.log("user",user);
        }
        fetch();
    },[])

    
    if(!user) return <div>Loading!</div>;
    var photo;
    if(!user.photo){
         photo=<div>No photo</div>;
    }else{
        photo=<div>photo</div>;

    }
    console.log(user);

    return (
        <>
        <Card style={{width: '20rem'}}>
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                
                
        {user.photo?
        
            <Image src={user.photo} onClick={toggleProfilePicpopup} roundedCircle/>
        
        :
        <Button onClick={toggleProfilePicpopup}>Upload picture</Button>}

        <Card.Text>{user.email}</Card.Text>
       
            </Card.Body>
        </Card>
        
            <ProfileModal show={profilePicPopup} hide={toggleProfilePicpopup}/>
        </>

       
    )
}