import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { Row, Container, Button, Col, Form } from "react-bootstrap";
import "../styles/Signup.scss";

const SignUpPage = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});
    const [fail, setFail] = useState(false);

    let { from } = location.state || { from: { pathname: "/" } };

    const findErrors = () => {
        const errors = {};

        if (firstName === "") errors.firstName = "First name cannot be blank";
        if (lastName === "") errors.lastName = "Last name cannot be blank";
        if (email === "") errors.email = "Username cannot be blank";
        else if (typeof email !== String) errors.email = "Enter only string";
        else if (email.length < 3) errors.email = "Enter a valid email";
        if (password === "") errors.password = "Password cannot be blank";
        else if (password.length < 4)
            errors.password = "Password should be a minimum of 4 characters";

        return errors;
    };

    let signup = () => {
        console.log(`email: ${email} password: ${password}`);
        // going back two as we will always route to /login before /signup.

        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            auth.signup(email, password, firstName, lastName, success, failure);
        }
    };

    const success = () => {
        history.push("/login");
    };

    const failure = () => {
        setFail(true);
    };

    return (
        <Container fluid className="signup">
            <Row className="justify-content-md-center">
                <Col lg={4} className="signup banner d-sm-none d-md-block">
                    <h2>
                        <Link to="/" className="signup banner__title">
                            MindPortal
                        </Link>
                    </h2>
                </Col>

                <Col className="signup form">
                    <h1 className="signup title">
                        Register to COVID MindPortal
                    </h1>
                    <p>
                        Already a member?{" "}
                        <Link
                            to={{
                                pathname: "/login",
                                state: { from: from },
                            }}
                        >
                            Sign in now
                        </Link>
                    </p>
                    <Form>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 3 }}>
                                <Form.Label className="signup form__label">
                                    First Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Col>
                            <Col sm={{ span: 3 }}>
                                <Form.Label className="signup form__label">
                                    Last Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 6 }}>
                                <Form.Label className="signup form__label">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Your username will be this email address.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 6 }}>
                                <Form.Label className="signup form__label">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Button className="signup form__btn" onClick={signup}>
                            Register
                        </Button>
                    </Form>
                    {fail ? (
                        <div style={{ color: "red" }}>Failed to sign up</div>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpPage;
