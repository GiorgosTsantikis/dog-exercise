import { Client } from "@stomp/stompjs";
import {  getKeycloakInstance, isTokenExpired, refreshToken, setUserInfo } from "./KeycloakService";
import applicationLogger from "./logger";


const chatEndpoint=import.meta.env.VITE_CHAT_URL;


const resourceServer=import.meta.env.VITE_API_BASE_URL;
var client;
var id;
const eventEmitter=new EventTarget();

export async function initializeMessages(){
const token=getKeycloakInstance().token;
if(sessionStorage.getItem("userId")){
  id=sessionStorage.getItem("userId");
}else{
  await setUserInfo();
  id=sessionStorage.getItem("userId");
}
if(isTokenExpired()){
  await refreshToken();
}
client=new Client(
  {
     brokerURL: chatEndpoint,
     connectHeaders: {
       'Authorization': `Bearer ${token}`,  // Include the token in the headers
      },
      onConnect: () => {
         console.log('Connected to WebSocket',id);
          
        client.subscribe(`/user/${id}/queue/messages`, (message) => {
           const msg = JSON.parse(message.body);
           sendMessage(msg);
          console.log('Received private message:', msg);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      },
      onDisconnect:()=>{"STOMP DISCONNECT"},
      debug: (str) => {
        //console.log(str);
      },
      });
      
      // Activate the client (open WebSocket connection)
  client.activate();
}

function sendMessage(msg){
  eventEmitter.dispatchEvent(new CustomEvent(
    "messageReceived",{detail:msg}
  ));
}

// Function to listen for messages (subscribe to an event)
export const onMessage = (callback) => {
  const handler = (event) => callback(event);
  eventEmitter.addEventListener("messageReceived", handler);
  return () => eventEmitter.removeEventListener("messageReceived", handler);
};



export function updateToken(newToken){
  if(!client){return ;}
  applicationLogger.debug("MessagingService.updateToken ",newToken)
  try{
    client.publish({
      destination: `/app/update`,
      headers:{"refresh":`${newToken}`},
      body: "refreshmemen",
    })
  }catch(error){
    applicationLogger.error("MessagingService.updateToken ",error);
  }
}




//sends message to user with id userId
export async function sendPrivateMessage(userId, message) {
  applicationLogger.info("MessagingService.sendPrivateMessage userId: ",userId," message: ",message," client: ",client);
  if(!client){return;}
  if(isTokenExpired()){
    await refreshToken();
    applicationLogger.info("MessagingService.sendPrivateMessage refreshed token");

  }
  /*
  const msg = JSON.stringify({
    
    message: message,
    date: new Date().toISOString(),
  });
  */
  
  // Send the message to the server
  client.publish({
    destination: `/app/user/${userId}/queue/messages`,
    body: message,
  });
}


  
       
    

    

