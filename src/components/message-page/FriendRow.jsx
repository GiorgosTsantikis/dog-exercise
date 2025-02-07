import React from "react";
import { Row,Col, Button,Image } from "react-bootstrap";
import applicationLogger from "../../services/logger";

export default function FriendRow(props){

    const{id,email,firstName,lastName,profilePic,username}=props.props.userDetails;
    var pic="data:image/jpeg;base64,".concat(props.props.pic);
    


    function handleSendMessage(evt){
        props.sendMessage(evt.target.value);
    }


    applicationLogger.debug(id,email,username," FriendRow");
    return(
        <>
        <Row>
            <Col>
            <Image src={`${pic}`} roundedCircle/>
            {`${username}, ${email}`}<Button onClick={handleSendMessage} value={id}>Send Message</Button>
            </Col>
        </Row>
          
        </>
    );
    
}