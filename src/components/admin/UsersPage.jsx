import React, { useEffect,useState } from "react";
import { getUsersAdmin } from "../../services/ApiCalls";
import UserComponent from "./UserComponent";
import { Container } from "react-bootstrap";

export default function UsersPage(){
    const [usersList,setUsersList]=useState([]);
    var users;

    function makeAdmin(evt){
        const username=evt.target.value;
        console.log("make me admin",username);
    }
    useEffect(()=>{
            async function fetch(){
                 const response=await getUsersAdmin();
                 users=response.data;
                 setUsersList(users);
                 console.log(users);
            }
            fetch();
        },[])

    

    return (

        <Container className="py-4">
            <div className="row">
            {usersList.map(user=><div className="col-md-4" key={user.id}><UserComponent key={user.id} props={user} makeAdmin={makeAdmin}/></div>) }
            </div>
        </Container>
    )

}