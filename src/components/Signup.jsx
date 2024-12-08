import React, { useState } from "react";
import { Form,FormText,FormControl, Container ,Button, OverlayTrigger,Tooltip} from "react-bootstrap";
import { validateEmail,validatePassword,validatePhoneNumber,validateUsername,matchPassword } from "../validation/validation";
import useForm from "../hooks/useForm";
import axios from "axios";

export default function Signup(){

    const initialValues={username:'',email:'',password:'',password_match:''}
    const {values,errors,handleChange,handleSubmit}=useForm(initialValues,validate);

    const [userTaken,settUserTaken]=useState(false);
    function validate(name,value){
        if(name==='email')return validateEmail(value);
        if(name==='username')return validateUsername(value);
        if(name==='password')return validatePassword(value);
        if(name==='password_match') return matchPassword(value,values.password);
    }


    const onSubmit=async (data)=>{
        settUserTaken(false);
         axios.post(`/api/auth/register`,
            data,{headers:{"Content-Type":"application/json"}})
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err.response.data);
                if(err.response.data==="Username taken"){
                    settUserTaken(true);
                }
            })
        //setListing(response.data);
    }
    
   
    

    
    
   

    return(
        <Container className="mt-4">

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="sign-up-username">
                    <Form.Label>Username</Form.Label>
                    <OverlayTrigger
                    placement="top"
                    overlay={errors.username?<Tooltip id="username-tooltip">{errors.username}</Tooltip>:<></>}>
                        <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Username"/>
                    </OverlayTrigger>
                    {userTaken && (<div className="text-danger mt-1">Username taken</div>)}
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="sign-up-email">
                    <Form.Label>Email</Form.Label>
                    <OverlayTrigger
                    placement="top"
                    overlay={errors.email?<Tooltip id="email-tooltip">{errors.email}</Tooltip>:<></>}>
                        <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="email"/>
                    </OverlayTrigger>
                    
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="sign-up-pass">
                    <Form.Label>Password</Form.Label>
                    <OverlayTrigger
                    placement="top"
                    overlay={errors.password?<Tooltip id="password-tooltip">{errors.password}</Tooltip>:<></>}>
                    <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    isInvalid={!!errors.password}
                    onChange={handleChange}
                    />
                    </OverlayTrigger>
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="verify-pass">
                    <Form.Label>Password</Form.Label>
                    <OverlayTrigger
                    placement="top"
                    overlay={errors.password_match?<Tooltip id="password_match-tooltip">{errors.password_match}</Tooltip>:<></>}>
                    <Form.Control
                    type="password"
                    name="password_match"
                    value={values.password_match}
                    isInvalid={!!errors.password_match}
                    onChange={handleChange}
                    />    
                    </OverlayTrigger>
                    
                </Form.Group>
                
                <Button variant="primary" type="submit">Sign-up</Button>
            </Form>
            </Container>

    )

}