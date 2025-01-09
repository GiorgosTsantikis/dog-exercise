import React, { useEffect, useState } from 'react';
import {acceptRequest, friendRequest, getProfile,getProfilePic} from '../services/ApiCalls';
import { Card, Form, Image,Button, CardHeader, CardBody } from 'react-bootstrap';
import '../css/Profile.css';
import ProfileModal from './ProfileModal';


export default function Profile(){

    const [user,setUser]=useState(null);
    const [input,setInput]=useState("");
    const [friendList,setFriendList]=useState([]);
    const[profilePicPopup,setProfilePicPopup]=useState(false);

    const toggleProfilePicpopup=()=>{
        setProfilePicPopup(!profilePicPopup);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const response= await friendRequest(input);

        console.log(response.data);
        

    }
    

    function handleChange(e){
        setInput(e.target.value);
    }

    async function acceptFriendRequest(e){
        const response=await acceptRequest(e.target.value);
        setFriendList((await getProfile()).data.friends);
        console.log(response.data);
        
        
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
            setFriendList(response.data.friends);
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
        <div className='py-4 container'>
        <Card style={{width: '20rem'}}>
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                
                
        {user.photo?
        
            <Image src={user.photo} onClick={toggleProfilePicpopup} roundedCircle/>
        
        :
        <Button className='profilebtn' onClick={toggleProfilePicpopup}>Upload picture</Button>}

        <Card.Text>{user.email}</Card.Text>
       
            </Card.Body>
        </Card>
        
            <ProfileModal show={profilePicPopup} hide={toggleProfilePicpopup}/>
        </div>
        <div className='py-4 container'>
            <Card>
                <Card.Header>Add friend</Card.Header>
                <Card.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={input}
                    onChange={handleChange}
                    placeholder="Email or Username"/>
                </Form.Group>
                <Button variant="primary" className='profilebtn' type="submit">Send</Button> 
                </Form>
                </Card.Body>
            </Card>
        </div>

        <div className='py-4 container'>Accepted:{(user.friends.filter((x)=>x.status.includes('ACCEPTED'))).map(x=>x.friendId)}</div>
        <div className='py-4 container'>Pending:{(user.friends.filter((x)=>x.status.includes('PENDING_SENDER'))).map(x=>x.friendId)}</div>
        <div className='py-4 container'>Requests:{(user.friends.filter((x)=>x.status.includes('PENDING_RECEIVER'))).map(x=><button onClick={acceptFriendRequest} value={x.friendId}>{x.friendId}</button>)}</div>

        </>

       
    )
}