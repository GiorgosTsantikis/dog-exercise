import React, { useEffect,useState } from "react";
import { getUsersAdmin } from "../../services/ApiCalls";
import { isAdmin } from "../../services/Authentication.service";
import UserComponent from "./UserComponent";

export default function UsersPage(){
    const token=localStorage.getItem("token");
    const [usersList,setUsersList]=useState([]);
    var users;

    function makeAdmin(evt){
        const username=evt.target.value;
        console.log("make me admin",username);
    }
    useEffect(()=>{
    if(token && isAdmin(token)){
        
            async function fetch(){
                 const response=await getUsersAdmin(token);
                 users=response.data;
                 setUsersList(users);
                 console.log(users);
            }
            fetch();
        }},[])

    

    return (

        <div>{usersList.map(user=><UserComponent key={user.id} props={user} makeAdmin={makeAdmin}/>) }</div>
    )

}