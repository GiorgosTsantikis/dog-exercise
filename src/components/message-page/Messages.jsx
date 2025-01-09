import React, { useEffect ,useState} from "react";
import MessagingService from "../../services/MessagingService";
import { getKeycloakInstance } from "../../services/KeycloakService";
import { getProfile } from "../../services/ApiCalls";
import { Container } from "react-bootstrap";
import FriendRow from "./FriendRow";
import sendPrivateMessage from "../../services/MessagingService";

export default function Messages(){

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [friends,setFriends]=useState([]);
  const keycloak=getKeycloakInstance();


    useEffect(()=>{
      async function fetchFriends(){
        const resp=await getProfile();
        console.log(resp.data,"friends");
        setFriends(resp.data.friends);
      }
      fetchFriends();
       
    },[]);

   

    function sendMessage(id){
      console.log("send to ",id);
      sendPrivateMessage(id,"lalala");
    }

    
    
      if(!friends){return <div>Loading!</div>}

    return(
        <>
        
            <Container className="py-4 container" fluid>{friends.map(friend=><FriendRow  key={friend.friendId} props={friend} sendMessage={sendMessage}/>)}</Container>
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
              <button onClick={sendMessage}>Send</button>
            </div>
           </>
          );
    
}