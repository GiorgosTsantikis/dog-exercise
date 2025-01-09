import React from "react";
import { Row,Col, Button } from "react-bootstrap";
import applicationLogger from "../../services/logger";

export default function FriendRow(props){

    function handleSendMessage(evt){
        props.sendMessage(evt.target.value);
    }

    const{friendId,status}=props.props;
    applicationLogger.debug(friendId,status,props," FriendRow");
    return(
        <>
        <Row>
            <Col>{`${friendId}, ${status}`}<Button onClick={handleSendMessage} value={friendId}>Send Message</Button></Col>
        </Row>
          
        </>
    );
    
}