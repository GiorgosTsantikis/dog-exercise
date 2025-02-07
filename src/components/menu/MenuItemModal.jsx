import React from "react";
import { useState } from "react";
import { Modal,Form,Button } from "react-bootstrap";
import AttributeInput from "./AttributeInput";

export default function MenuItemModal(props){

  console.log(props);

  function onModalChange(data){
    props.onSubmit(data);
    props.hide();
    //console.log(e);
  }

  function handleSubmit(){}
  let attributes=<AttributeInput attributes={props.attr} value={""} onSubmit={onModalChange}/>;

    return(
        <Modal show={props.show}  onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {attributes}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}