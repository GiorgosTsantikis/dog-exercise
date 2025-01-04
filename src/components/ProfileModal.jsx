import React from "react";
import { useState } from "react";
import { Modal,Form,Button } from "react-bootstrap";
import { postProfilePic } from "../services/ApiCalls";

export default function ProfileModal(props){

  console.log(props);

  const [file,setFile]=useState(null);

  function handleFileChange(evt){
    if(evt.target.files){
      setFile(evt.target.files[0]);
      console.log(evt.target.files[0].name);
    }
  }
  
  function handleSubmit(evt){
    evt.preventDefault();
    console.log(evt);
    if(file){
      postProfilePic(file);
      props.hide(); 
    }

  }

    return(
        <Modal show={props.show}  onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3" onChange={handleFileChange}>
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide} >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes 
          </Button>
        </Modal.Footer>
      </Modal>
    )
}