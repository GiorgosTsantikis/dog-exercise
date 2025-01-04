import axios from 'axios';

import { getKeycloakInstance } from './KeycloakService';

const resourceServer=import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(request=>{
    const excludedPaths=['/auth/register'];
    if(excludedPaths.some(path=>request.url.includes(path))){
        return request;
    }
    const token=getKeycloakInstance().token;
    if(token){
        request.headers['Authorization']=`Bearer ${token}`;
    }
    return request;
},error=>{
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response=>response,
    async error=>{
        const keycloak=getKeycloakInstance();
        const originalRequest=error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry=true;
            try{
                await keycloak.updateToken();
                return axios(originalRequest);
            }catch(error) {
                keycloak.login();
                return Promise.reject(error);
            }
        }
    }
);


export  async function getListing(id){
   return await axios.get(`${resourceServer}/listings/${id}`
        ,{headers:{"Content-Type":"application/json"},})
        .catch((err)=>{
            console.log("status",err.status);
            return Promise.reject(error);
        })
            
}

export  async function getListings(){
    return await axios.get(`${resourceServer}/listings`
        ,{headers:{"Content-Type":"application/json"}})
            .catch((err)=>{
                return Promise.reject(error);
})               
}

export async function postListing(form){
    return axios.post(`${resourceServer}/listings`,
        form
        ,{headers:{"Content-Type":"application/json"},})
        .catch(err=>{
            return Promise.reject(error);
        });
    
}
 




export async function getProfile(){
    return await axios.get(`${resourceServer}/users/profile`)
    .catch(err=>{
        console.log(err);
        return Promise.reject(err);
    })
}

export async function getProfilePic(){
    return await axios.get(`${resourceServer}/users/picture`)
    .catch(err=>console.log(err))
}

export async function getUsersAdmin(){
        return await axios.get(`${resourceServer}/admin/allUsers`)
        .catch(err=>console.log(err));
}

export async function postProfilePic(pic){
    if(pic){
        const formData=new FormData();
        formData.append("img",pic);

        return await axios.post(`${resourceServer}/users/pic`,formData,{
            headers:{"Content-Type":"multipart/form-data"}
        })
        .catch(err=>{
            console.log(err);
        })
    }
}