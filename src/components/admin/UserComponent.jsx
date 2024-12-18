import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";

export default function UserComponent(props){
    console.log(props.props,"props");
    const {username,role}=props.props;
    const {makeAdmin}=props.makeAdmin;
    return(
        <Card>
            <CardHeader>{username}</CardHeader>
            <CardBody>{role}</CardBody>
            <CardFooter>
            <Button value={username} onClick={props.makeAdmin}>Admin</Button>
            </CardFooter>
        </Card>
    )
}