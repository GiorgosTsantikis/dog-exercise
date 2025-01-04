
import React,{useState} from "react";
import {Form,Button,Container,Row,Col} from 'react-bootstrap';
import { postListing } from "../services/ApiCalls";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function AddListing(){

    const[formData,setFormData]=useState({name:'',city:'',state:'',laundry:false,wifi:false,unitsAvailable:0,rooms:0,price:0});

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}));
    };

    const  handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("submit ", {...formData});
        const response=await postListing(formData);
        //setListing(response.data);
        if(response.status===200){
            window.location.href="/home";
        }
    }
    


    return(
        <Container className="mt-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Estate name"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Estate city"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Estate state"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Row>
                        <Col>
                    <Form.Check
                    type="checkbox"
                    label="Wifi"
                    name="wifi"
                    value={formData.wifi}
                    onChange={handleChange}
                    />
                    </Col>
                    <Col>
                    <Form.Check
                    type="checkbox"
                    label="Laundry"
                    name="laundry"
                    value={formData.laundry}
                    onChange={handleChange}
                    />
                    </Col>
                    </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="numberInput">
                    <Form.Label>Units Available</Form.Label>
                    <Form.Control
                    type="number"
                    name="unitsAvailable"
                    value={formData.unitsAvailable}
                    onChange={handleChange}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="numberInput">
                    <Form.Label>Rooms Available</Form.Label>
                    <Form.Control
                    type="number"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    />
                    </Form.Group>
                  

                <Button variant="primary" type="submit">Submit</Button>
            </Form>

        </Container>
    )
}

