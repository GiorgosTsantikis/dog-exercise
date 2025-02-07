import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessagesBetweenTwoUsers } from "../../services/ApiCalls";
import { Container, Form } from "react-bootstrap";
import ChatBubble from "./ChatBubble";
import {sendPrivateMessage,onMessage} from "../../services/MessagingService";
import Chat from "./Chat";
import '../../css/PrivateChat.css';

export default function PrivateChat() {
  const friendId = useParams().id; // Get friendId from URL params
  const userId = sessionStorage.getItem("userId"); // Get userId from sessionStorage
  const messagesContainerRef = useRef();

  const [messages, setMessages] = useState([]); // Store messages here
  const [prevPage, setPrevPage] = useState(0);
  const [newMsg, setNewMsg] = useState(""); // Reactive state for new message input
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Whether more messages are available
  const [currentPage, setCurrentPage] = useState(1); // Page state
  const messagesMap = useRef(new Map()); // Map to cache fetched messages

  const getMessages = async (page, first) => {
    console.log("get page ", page);

    if(first){
      try {
        setLoading(true);
        
        // Fetch current page messages
        const response = await getMessagesBetweenTwoUsers(friendId, userId, 0);
        const response2 = await getMessagesBetweenTwoUsers(friendId, userId, 1);
        const currentMessages = response.data.content.reverse(); // Reverse to maintain correct order
        const nextMsgs = response2.data.content.reverse();
    
        // Cache the current page messages
        messagesMap.current.set(0, currentMessages);
        messagesMap.current.set(1, nextMsgs);
        setMessages((prev)=>[...messagesMap.current.get(0),...messagesMap.current.get(1)]);
        setHasMore(response.data.totalPages > 1);
        return;
        } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    }
  
    // Determine the previous page (if not the first page)
    const prev = page > 0 ? page - 1 : 0;
    setPrevPage(prev); // Set prevPage to the previous page or 0 if first
  
    // Check if both the current page and the previous page are cached
    if (messagesMap.current.has(page) && messagesMap.current.has(prev)) {
      console.log("has both");
      if(page===0 && prev===0){
        setMessages((prev)=>[...messagesMap.current.get(page)]);
        return;
      }
      const currentMessages = messagesMap.current.get(page);
      let previousMessages;
      if(prev!==0)
         previousMessages = messagesMap.current.get(prev).slice(-10); // Get the last 10 messages from the previous page
      else
        previousMessages = messagesMap.current.get(prev);
  
      // Combine messages from both pages
      setMessages((prevMessages) => [...previousMessages, ...currentMessages]);
      return;
    }
  
    // Fetch messages from the API if not cached
    try {
      setLoading(true);
      
      // Fetch current page messages
      const response = await getMessagesBetweenTwoUsers(friendId, userId, page);
      const currentMessages = response.data.content.reverse(); // Reverse to maintain correct order
  
      // Cache the current page messages
      messagesMap.current.set(page, currentMessages);
  
      // If the previous page is not cached, fetch it
      
  
      // Now get the last 10 messages from the previous page
      const previousMessages = messagesMap.current.has(prev) ? prev!==0 ? messagesMap.current.get(prev).slice(-10)  : messagesMap.current.get(prev) : [];
      console.log("prev page ",prev, "msgs ",previousMessages, "has? ",messagesMap.current.has(prev));
  
      // Combine messages from both pages
      if(page===0 && prev===0){
        setMessages((prev)=>[...messagesMap.current.get(page)]);
        setHasMore(response.data.totalPages > page);
        return;
      }
      setMessages((prevMessages) => [...previousMessages, ...currentMessages]);
      setHasMore(response.data.totalPages > page); // Check if there are more pages
      console.log("total pages ", response.data.totalPages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  
  
  

  // Handle the submit action when the user sends a message
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    sendPrivateMessage(friendId, newMsg);
    setNewMsg("");
    setCurrentPage(0); // Reset to the first page after sending a message
   getMessages(0,true).then(()=>{
    scrollToBottom(999);
   }) // Fetch the latest messages
     // Scroll to the bottom after sending a message
  };

  // Handle changes in the input field
  const handleChange = (evt) => {
    setNewMsg(evt.target.value);
  };

  // Scroll to the bottom of the messages container
  const scrollToBottom = (num) => {
    setTimeout(()=>{
      console.log("scroll to bottom ",num);
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = num; // Scroll to the bottom
      console.log(container.scrollHeight," ",container.scrollTop," ",container);
    }
    },100);
    
  };

  // Load messages on initial mount
  useEffect(() => {
    getMessages(0,true); // Load the first page of messages
    scrollToBottom(999);
    const handleMessageReceived = (event) => {
      console.log("received msg in PrivateChat");
      setMessages((prevMessages) => [...prevMessages, event.detail]); // Assuming the message is in event.detail
    };

    const unsubscribe = onMessage(handleMessageReceived);
  }, []);

  // Load more messages when the user scrolls to the top
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    console.log((scrollTop*-1 +400), " scroll top*-1 +400", e.target.scrollHeight, " height",scrollTop," actual scroll top");
    if (((((scrollTop*-1)+400) === (e.target.scrollHeight)) || (scrollTop === e.target.scrollHeight)) && !loading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
    }
    if(scrollTop===0 && currentPage!==0){
      setTimeout(()=>{
        if(scrollTop===0){
          setHasMore(true);
          setCurrentPage((prevPage)=>prevPage-1);
        }
       
      },100);
    }
    if(scrollTop===0 && currentPage===0){
      console.log("eyy");
      setMessages((prev)=>[...messagesMap.current.get(0),...messagesMap.current.get(1)])
    }
  };

  // Fetch the next page of messages if needed
  useEffect(() => {
    if (currentPage > 1) {
      getMessages(currentPage,false); // Fetch more messages when the page changes
      setTimeout(
      scrollToBottom(-1040),100);
      console.log(messagesContainerRef.current.scrollHeight/2,"aaa");
    }
    setTimeout(()=>{},100);
  }, [currentPage]);

  return (
    <>
      <Container>
        Profile header
      </Container>

      <div
        ref={messagesContainerRef}
        id="scroll-div"
        style={{
          display: "flex",
          flexDirection: "column-reverse", // Keep normal column direction
          overflowY: "auto", // Enable vertical scrolling
          height: "400px",
        }}
        onScroll={handleScroll}
      >
        {!loading ? (
          messages.map((msg, index) => (
            <div key={msg.id} className="chat-bubble">
              <ChatBubble
                content={msg.content}
                sent={msg.senderId === userId}
                sentAt={msg.sentAt}
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Send a message:</Form.Label>
            <Form.Control
              type="text"
              name="msg"
              value={newMsg}
              onChange={handleChange}
              placeholder="Message"
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export function receiveMessage(){

}
