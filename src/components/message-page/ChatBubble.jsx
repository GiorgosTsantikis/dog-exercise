import React from "react";
import "../../css/ChatBubble.css"; // Optional for styling


 export default function ChatBubble(props){
const{content,sentAt,sent}=props;

function normalTime(date){
  const dateObj=new Date(date);
  return dateObj.toLocaleString('en-US', {
    year: 'numeric', // e.g. '2025'
    day: 'numeric', // e.g. '13'
    month: 'numeric', // e.g. 'January'
    hour: 'numeric', // e.g. '7'
    minute: 'numeric', // e.g. '02'
    second: 'numeric', // e.g. '42'
    hour12: true, // Use 12-hour clock (AM/PM)
  });
}


//console.log(props);
  return (
    <div
      className={`chat-bubble ${sent ? "sent" : "received"}`}
    >
      <div className="chat-content">{content}</div>
      <div className="chat-time">{normalTime(sentAt)}</div>
    </div>
  );
};

