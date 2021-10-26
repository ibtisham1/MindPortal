import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { Row, Container, Button, Col, Form, Spinner } from "react-bootstrap";
import "../styles/Signup.scss";
import LampSVG from "../components/LampSVG";
import LogoTxt from "../components/LogoTxt";
import { motion } from "framer-motion";

const STATES = {
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    DEFAULT: "DEFAULT",
};

const SignUpPage = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});
    const [signUpState, setSignUpState] = useState(STATES.DEFAULT);

    let { from } = location.state || { from: { pathname: "/" } };

    const findErrors = () => {
        const errors = {};

        if (firstName === "") errors.firstName = "First name cannot be blank";
        if (lastName === "") errors.lastName = "Last name cannot be blank";
        if (email === "") errors.email = "Username cannot be blank";
        else if (!isValidEmail()) errors.email = "Enter a valid email";
        if (password === "") errors.password = "Password cannot be blank";
        else if (password.length < 6)
            errors.password = "Password should be a minimum of 6 characters";
        else if (!hasUpperCase()) {
            errors.password = "Password must contain 1 uppercase character";
        } else if (!hasDigit()) {
            errors.password = "Password must contain 1 digit";
        }

        return errors;
    };

    const isValidEmail = () => {
        return /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)
            ? true
            : false;
    };

    const hasUpperCase = () => {
        return /[A-Z]/.test(password) ? true : false;
    };

    const hasDigit = () => {
        return /\d/.test(password) ? true : false;
    };

    let signup = (e) => {
        e.preventDefault();

        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setSignUpState(STATES.LOADING);
            auth.signup(email, password, firstName, lastName, success, failure);
        }
    };

    const success = () => {
        setSignUpState(STATES.SUCCESS);

        setTimeout(() => {
            history.push("/dashboard");
        }, 2000);
    };

    const failure = () => {
        setSignUpState(STATES.FAILURE);
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
                        {signUpState === STATES.LOADING && (
                            <Spinner animation="border" />
                        )}
                        {signUpState === STATES.SUCCESS && (
                            <Row className="justify-content-md-center">
                                <Col sm={{ span: 2 }}>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.75 }}
                                    >
                                        <svg
                                            class="checkmark"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                        >
                                            <circle
                                                class="circle"
                                                cx="20"
                                                cy="20"
                                                r="20"
                                                fill="#0c3"
                                            />
                                            <path
                                                class="check"
                                                d="M13 20l5 5 9-9"
                                                fill="none"
                                                stroke="#fff"
                                                stroke-width="2.5"
                                                stroke-linecap="round"
                                            ></path>
                                        </svg>
                                    </motion.div>
                                </Col>
                            </Row>
                        )}
                        {(signUpState === STATES.DEFAULT ||
                            signUpState === STATES.FAILURE) && (
                            <>
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
                                            <Form.Text
                                                className="text-muted"
                                                style={{ fontStyle: "italic" }}
                                            >
                                                Password must be longer than 5
                                                characters, contain at least 1
                                                uppercase character and at least
                                                1 digit.
                                            </Form.Text>
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
                                    <Row className="justify-content-md-center">
                                        {signUpState === STATES.FAILURE && (
                                            <div
                                                style={{
                                                    color: "#dc3545",
                                                    fontWeight: 200,
                                                    textAlign: "center",
                                                    paddingTop: 3,
                                                }}
                                            >
                                                Failed to sign up, please try
                                                again.
                                            </div>
                                        )}
                                    </Row>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
};

export default SignUpPage;
