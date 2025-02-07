import axios from 'axios';

import { getKeycloakInstance } from './KeycloakService';
import log from './logger';
import applicationLogger from './logger';

const resourceServer=import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(request=>{
    applicationLogger.debug("ApiCalls.tokenInterceptor on request to: ",request.url);
    const excludedPaths=['/auth/register'];
    if(excludedPaths.some(path=>request.url.includes(path))){
        applicationLogger.debug("ApiCalls.tokenInterceptor excluded path sending request as is");
        return request;
    }
    const token=getKeycloakInstance().token;
    if(token && request.headers['Authorization']!==`Bearer ${token}`){
        request.headers['Authorization']=`Bearer ${token}`;
        applicationLogger.debug("ApiCalls.tokenInterceptor attaching keycloak token");
    }
    return request;
},error=>{
    applicationLogger.error("ApiCalls.tokenInterceptor error ",error);
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
                const resp=await keycloak.updateToken();
                applicationLogger.warn("ApiCalls.tokenInterceptor attempting token refresh response",resp);
                return axios(originalRequest);
            }catch(error) {
                applicationLogger.warn("ApiCalls.tokenInterceptor error ",err," redirecting to login");
                keycloak.login();
                return Promise.reject(error);
            }
        }
    }
);


export  async function getListing(id){
    applicationLogger.debug("ApiCalls.getListing(",id,")");
   return await axios.get(`${resourceServer}/listings/${id}`
        ,{headers:{"Content-Type":"application/json"},})
        .catch((err)=>{
            applicationLogger.error("ApiCalls.getListing error",err,"status",err.status);
            return Promise.reject(error);
        })
            
}

export  async function getListings(){
    applicationLogger.debug("ApiCalls.getListings");
    return await axios.get(`${resourceServer}/listings`
        ,{headers:{"Content-Type":"application/json"}})
            .catch((err)=>{
                applicationLogger.error("ApiCalls.getListings error",err);
                return Promise.reject(error);
})               
}

export async function postListing(form){
    applicationLogger.debug("ApiCalls.postListing(",form,")");

    return axios.post(`${resourceServer}/listings`,
        form
        ,{headers:{"Content-Type":"application/json"},})
        .catch(err=>{
            applicationLogger.error("ApiCalls.postListing error",err);
            return Promise.reject(error);
        });
}

export async function getFriendsData(id){
    applicationLogger.debug("ApiCalls.getFriendsData(",id,")");
    return axios.get(`${resourceServer}/users/friends/${id}`)
    .catch(error=>applicationLogger.error(error));
}

export async function friendRequest(usernameOrEmail){
    applicationLogger.debug("ApiCalls.friendRequest(",usernameOrEmail,")");

    return axios.post(`${resourceServer}/users/friendRequest/${usernameOrEmail}`)
    .catch(err=>{
        applicationLogger.error("ApiCalls.friendRequest error",err);
        return Promise.reject(error);
    });
}

export async function acceptRequest(id){
    applicationLogger.debug("ApiCalls.acceptRequest(",id,")");
    return axios.post(`${resourceServer}/users/acceptRequest/${id}`)
    .catch(err=>{
        return Promise.reject(error);
    })
}

export async function getMessagesBetweenTwoUsers(id1,id2,page){
    applicationLogger.debug("ApiCalls.getMessagesBetweenTwoUsers( ",id1," , ",id2," )");
    return axios.get(`${resourceServer}/users/messages/${id1}/${id2}?page=${page}&size=${10}`)
    .catch(error=>{
        applicationLogger.error("ApiCalls.getMessagesBetweenTwoUsers error",err);

    })
}
 




export async function getProfile(){
    applicationLogger.debug("ApiCalls.getProfile()");
    return await axios.get(`${resourceServer}/users/profile`)
    .catch(err=>{
        console.log(err);
        return Promise.reject(err);
    })
}

export async function getProfilePic(){
    applicationLogger.debug("ApiCalls.getProfilePic()");
    return await axios.get(`${resourceServer}/users/picture`)
    .catch(err=>{
        console.log(err);
        applicationLogger.error(err);
    }
)
}

export async function getUsersAdmin(){
    applicationLogger.debug("ApiCalls.getUsersAdmin calling /adming/allUsers");
        return await axios.get(`${resourceServer}/admin/allUsers`)
        .catch(err=>console.log(err));
}

export async function postProfilePic(pic){
    if(pic){
        const formData=new FormData();
        formData.append("img",pic);
        applicationLogger.debug("sending img ",pic);

        return await axios.post(`${resourceServer}/users/pic`,formData,{
            headers:{"Content-Type":"multipart/form-data"}
        })
        .catch(err=>{
            applicationLogger.error("error sending img ",err);
            console.log(err);
        })
    }
}

export async function sendLogs(logs){
    if(getKeycloakInstance().authenticated){
        applicationLogger.debug("sending logs...");
        return await axios.post(`${resourceServer}/logs/sendLogs`,logs,
            {headers:{"Content-Type":"application/json"}}
        )
        .catch(error=>{
            applicationLogger.error("error sending logs",error);
        })
    }
   
}