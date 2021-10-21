import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";
// import AuthButton from "../components/AuthButton";
import "../styles/Login.scss";
import { Row, Container, Button, Col, Form, Spinner } from "react-bootstrap";
import LogoTxt from "../components/LogoTxt";
import LampSVG from "../components/LampSVG";
import { motion, useMotionValue } from "framer-motion";

const STATES = {
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    DEFAULT: "DEFAULT",
};

const LoginPage = () => {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loginState, setLoginState] = useState(STATES.DEFAULT);

    let { from } = location.state || { from: { pathname: "/" } };

    const findErrors = () => {
        const errors = {};
        if (email === "") errors.email = "Email cannot be blank";
        else if (!isValidEmail()) errors.email = "Enter a valid email";
        if (password === "") errors.password = "Password cannot be blank";
        else if (password.length < 6)
            errors.password = "Password should be a minimum of 6 characters";

        return errors;
    };

    let login = (e) => {
        e.preventDefault();
        // // validate here
        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            // we have errors
            setErrors(newErrors);
        } else {
            setLoginState(STATES.LOADING);
            // setLoading(true);
            auth.signin(email, password, success, failure);
        }
    };

    const isValidEmail = () => {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
            ? true
            : false;
    };

    const success = () => {
        setLoginState(STATES.SUCCESS);

        setTimeout(() => {
            history.push("/dashboard");
        }, 2000);
    };

    const failure = () => {
        setLoginState(STATES.FAILURE);
    };

    return (
        <Container fluid className="Login__container ps-0">
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
                    <Col className="Login form" md={6}>
                        {loginState === STATES.LOADING && (
                            <div className="Login form__spinner">
                                {" "}
                                <Spinner animation="border" />
                            </div>
                        )}
                        {loginState === STATES.SUCCESS && (
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
                        {(loginState === STATES.DEFAULT ||
                            loginState === STATES.FAILURE) && (
                            <>
                                <p className="Login__form__title">Login</p>
                                <p className="Login__form__subtitle">
                                    Not a member?{" "}
                                    <Link
                                        className="Login__form__link"
                                        to={{
                                            pathname: "/signup",
                                            state: { from: from },
                                        }}
                                    >
                                        Sign up now
                                    </Link>
                                </p>
                                <Form>
                                    <Form.Group
                                        as={Row}
                                        className="justify-content-md-center"
                                    >
                                        <Col sm={{ span: 10 }}>
                                            <Form.Label className="Login form__label">
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
                                            <Form.Label className="Login form__label">
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
                                            className="Login form__btn"
                                            onClick={login}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            Login
                                        </motion.button>
                                    </Row>
                                </Form>
                            </>
                        )}
                        {loginState === STATES.FAILURE && (
                            <div style={{ color: "red" }}>Failed to log in</div>
                        )}
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
};

export default LoginPage;
