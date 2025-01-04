import React, { useEffect ,useState} from "react";
import MessagingService from "../../services/MessagingService";
import { getKeycloakInstance } from "../../services/KeycloakService";

export default function Messages(){

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const keycloak=getKeycloakInstance();

    useEffect(()=>{
        MessagingService.connect((message)=>{
            setMessages((prevMsgs)=>[...prevMsgs,message]);
        });

        return () => MessagingService.disconnect();
    },[]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
          const messageObject = {
            sender: keycloak.clientId, // Replace with actual sender info
            content: newMessage,
          };
          MessagingService.sendMessage(messageObject);
          setNewMessage("");
        }
      };

    return(
        
            <div className="py-4 container">
              <h2>Chat</h2>
              <div
                style={{
                  border: "1px solid #ccc",
                  height: "300px",
                  overflowY: "scroll",
                  padding: "10px",
                }}
              >
                {messages.map((msg, index) => (
                  <div key={index}>
                    <strong>{msg.sender}:</strong> {msg.content}
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          );
    
}