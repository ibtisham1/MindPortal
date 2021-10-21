import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { Row, Container, Button, Col, Form } from "react-bootstrap";
import "../styles/Signup.scss";
import LampSVG from "../components/LampSVG";
import LogoTxt from "../components/LogoTxt";
import { motion } from "framer-motion";

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
        <Container fluid className="signup__container ps-0">
            <div
                style={{
                    position: "fixed",
                    x: 0,
                    y: 0,
                    padding: 0,
                    width: 150,
                }}
            >
                <LampSVG />
            </div>

            <Row className="justify-content-md-center pt-3 mb-5">
                <LogoTxt />
            </Row>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0, duration: 0.25 }}
            >
                <Row className="justify-content-md-center">
                    <Col className="signup form" md={6}>
                        <p className="signup__form__title">Register</p>
                        <p className="signup__form__subtitle">
                            Already a member?{" "}
                            <Link
                                className="signup__form__link"
                                to={{
                                    pathname: "/login",
                                    state: { from: from },
                                }}
                            >
                                Sign in now
                            </Link>
                        </p>
                        <Form>
                            <Form.Group
                                as={Row}
                                className="justify-content-md-center"
                            >
                                <Col sm={{ span: 5 }}>
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
                                <Col sm={{ span: 5 }}>
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
                            <Form.Group
                                as={Row}
                                className="justify-content-md-center"
                            >
                                <Col sm={{ span: 10 }}>
                                    <Form.Label className="signup form__label">
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="justify-content-md-center"
                            >
                                <Col sm={{ span: 10 }}>
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
                            <Row className="justify-content-md-center">
                                <motion.button
                                    className="signup form__btn"
                                    onClick={signup}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Register
                                </motion.button>
                            </Row>
                        </Form>

                        {fail ? (
                            <div style={{ color: "red" }}>
                                Failed to sign up
                            </div>
                        ) : null}
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
};

export default SignUpPage;
