import axios from 'axios';

import { isAdmin } from './Authentication.service';

export  async function getListing(id){
    const token=localStorage.getItem("token");
   return await axios.get(`/api/listings/${id}`
        ,{headers:{"Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },})
        .catch((err)=>{
            console.log("status",err.status)
            if(err.status===403){
                window.location.href="/home";
            }
        })
            
}

export  async function getListings(){
    const token=localStorage.getItem("token");
    return await axios.get(`/api/listings`
        ,{headers:{"Content-Type":"application/json",
            "Authorization":`Bearer ${token}`},})
            .catch((err)=>{
                if(err.status===403)
                    window.location.href="/login";
})
                
}

export  async function login(formData){
    const token=localStorage.getItem("token");
    if(token){
        localStorage.removeItem("token");
    }
    return await axios.post("api/auth/login", {...formData},{headers:{Authorization:''}})
    
}

export async function signUp(data){
    return await axios.post(`/api/auth/register`,
        data,{headers:{"Content-Type":"application/json"}});
}

export function logInAction(token){
    
     localStorage.setItem("token", token); // Store the JWT in localStorage
     console.log("Login successful!", " ",token);
     console.log(isAdmin(token));
     if(isAdmin(token)) window.location.href="/admin/users";
     else window.location.href="/home";
}

export async function getProfile(){
    const token=localStorage.getItem("token");
    console.log(token);
    return await axios.get(`/api/users/profile`,{
        headers:{"Authorization":`Bearer ${token}`}
    })
    .catch(err=>{
        console.log(err);
        if(err.status===403){
            window.location.href="/login";

        }
    }
    )
}

export async function getProfilePic(){
    const token=localStorage.getItem("token");
    return await axios.get(`/api/users/picture`,{
        headers:{"Authorization":`Bearer ${token}`}
    })
    .catch(err=>console.log(err))
}

export async function getUsersAdmin(token){
    if(isAdmin(token)){
        return await axios.get(`/api/admin/allUsers`,{
            headers:{"Authorization":`Bearer ${token}`}
        })
        .catch(err=>console.log(err));
    }
}

export async function postProfilePic(pic,token){
    if(pic){
        const formData=new FormData();
        formData.append("img",pic);

        return await axios.post(`/api/users/pic`,formData,{
            headers:{"Authorization":`Bearer ${token}`,"Content-Type":"multipart/form-data"}
        })
        .catch(err=>{
            console.log(err);
        })
    }
}