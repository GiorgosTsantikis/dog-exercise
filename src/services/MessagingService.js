import { Client } from "@stomp/stompjs";
import { getKeycloakInstance } from "./KeycloakService";


const chatEndpoint=import.meta.env.VITE_CHAT_URL;

class MessagingService{

    resourceServer=import.meta.env.VITE_API_BASE_URL;

    constructor(){
        this.client=new Client();
    }

    connect(onMessageReceived) {
        const token=getKeycloakInstance().token;
        console.log("MESSAGE TOKEN? ",token);
        this.client.configure({
          brokerURL: chatEndpoint,
          
          connectHeaders:{
            Authorization: `Bearer ${token}`,
          },
          onConnect: () => {
            this.client.publish({
              destination:"/app/authenticate",
              body:JSON.stringify({token})
            });
            this.client.subscribe("/app/messages", (message) => {
              onMessageReceived(JSON.parse(message.body));
            });
          },
          debug: (str) => console.log(str),
        });
        this.client.activate();
      }
    
      sendMessage(message) {
        if (this.client.connected) {
          this.client.publish({
            destination: "/app/sendMessage",
            body: JSON.stringify(message),
          });
        }
      }
    
      disconnect() {
        this.client.deactivate();
      }
}

export default new MessagingService();


