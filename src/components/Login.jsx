import React, { useState } from "react";
import axios from "axios";
import { Container,Button,Form,FormGroup, Accordion } from "react-bootstrap";
import Signup from "./Signup";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        localStorage.clear();
        e.preventDefault();
        try {
            const response = await axios.post("api/auth/login", {...formData},{headers:{Authorization:''}});
            const token = response.data.token;
            
            localStorage.setItem("token", token); // Store the JWT in localStorage
            console.log("Login successful!");
            window.location.href="/";
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials");
        }
    };

    return (
        <>
        <Container className="mt-4" >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit">Log-in</Button>
            </Form>
        
        </Container>
        <Accordion style={{marginTop:"5px"}}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Sign-up!</Accordion.Header>
                <Accordion.Body>
                <Signup/>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </>
    );
};

export default Login;
