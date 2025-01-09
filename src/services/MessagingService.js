import { Client } from "@stomp/stompjs";
import { getKeycloakInstance } from "./KeycloakService";
import applicationLogger from "./logger";


const chatEndpoint=import.meta.env.VITE_CHAT_URL;


const resourceServer=import.meta.env.VITE_API_BASE_URL;

const token=getKeycloakInstance().token;
var client;

await getKeycloakInstance().loadUserInfo().then(
  userInfo=>{
    const id=userInfo['sub'];
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
            console.log('Received private message:', msg);
          });
        },
        onStompError: (frame) => {
          console.error('STOMP error', frame);
        },
        debug: (str) => {
          //console.log(str);
        },
      });
      
      // Activate the client (open WebSocket connection)
      client.activate();


  }
);





function sendPrivateMessage(userId, message) {
  if(!client){return;}
  const msg = JSON.stringify({
    
    message: message,
    date: new Date().toISOString(),
  });
  
  // Send the message to the server
  client.publish({
    destination: `/app/user/${userId}/queue/messages`,
    body: msg,
  });
}

export default sendPrivateMessage;

  
       
    

    

