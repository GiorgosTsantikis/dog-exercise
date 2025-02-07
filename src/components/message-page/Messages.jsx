import React, { useEffect ,useState} from "react";
import { getKeycloakInstance } from "../../services/KeycloakService";
import { getFriendsData, getProfile } from "../../services/ApiCalls";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../css/Messages.css';
import FriendRow from "./FriendRow";
import {sendPrivateMessage} from "../../services/MessagingService";
import applicationLogger from "../../services/logger";

export default function Messages(){

  const userId=sessionStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [friends,setFriends]=useState([]);
  const keycloak=getKeycloakInstance();


    useEffect(()=>{
      async function fetchFriends(){
        applicationLogger.debug("Messages.useEffect.fetchFriends fetching data of ",userId);
        const resp=await getFriendsData(userId);
        setFriends(resp.data);
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
        
            <Container className="py-4 container message-row" fluid key={"lelele"}>
              {friends.map(friend=><Link className="nav-link" key={friend.userDetails.id} to={`/chat/${friend.userDetails.id}`}>
              <FriendRow  key={friend.userDetails.id} props={friend} sendMessage={sendMessage}/></Link>)}
              </Container>
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