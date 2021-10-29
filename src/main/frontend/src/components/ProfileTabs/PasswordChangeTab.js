import React, { useState, useEffect } from "react";
import useAuth from "../../services/useAuth";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "../../styles/Profile.scss";
import CheckMarkSVG from "../CheckMarkSVG";
import { motion } from "framer-motion";
import CrossSVG from "../CrossSVG";

const STATES = {
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    DEFAULT: "DEFAULT",
};

const PasswordChangeTab = (props) => {
    const user = props.user;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const auth = useAuth();
    const { changePassword } = auth;
    const [isEnabled, setIsEnabled] = useState(true);
    const [errors, setErrors] = useState({});

    const [pageState, setPageState] = useState(STATES.DEFAULT);

    useEffect(() => {
        if (pageState === STATES.LOADING) {
            setIsEnabled(false);
        } else {
            setIsEnabled(true);
        }
    }, [pageState]);

    const findErrors = () => {
        const errors = {};

        if (newPassword === "") errors.password = "Password cannot be blank";
        else if (newPassword.length < 6)
            errors.password = "Password should be a minimum of 6 characters";
        else if (!hasUpperCase()) {
            errors.password = "Password must contain 1 uppercase character";
        } else if (!hasDigit()) {
            errors.password = "Password must contain 1 digit";
        }

        return errors;
    };

    const hasUpperCase = () => {
        return /[A-Z]/.test(newPassword) ? true : false;
    };

    const hasDigit = () => {
        return /\d/.test(newPassword) ? true : false;
    };

    const savePassword = () => {
        setPageState(STATES.DEFAULT);
        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // setLoading(true);
            setErrors({});
            setPageState(STATES.LOADING);
            changePassword(oldPassword, newPassword, onSuccess, onFailure);
        }
    };

    const onSuccess = () => {
        // setLoading(false);
        setPageState(STATES.SUCCESS);
        // display a success message
        setNewPassword("");
        setOldPassword("");
    };

    const onFailure = () => {
        // setLoading(false);
        setPageState(STATES.FAILURE);
        // set any errors
    };

    return (
        <div className="reset-password">
            <Form>
                <Row>
                    <p>
                        To change your password simply enter your current
                        password and what you would like to change it to.
                    </p>
                </Row>
                <Row>
                    <Col sm={6}>
                        {" "}
                        {pageState === STATES.LOADING ? (
                            <Spinner
                                animation="border"
                                variant="info"
                                size="lg"
                            />
                        ) : (
                            <>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={3}>
                                        <Form.Label className="">
                                            Old Password
                                        </Form.Label>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Control
                                            className=""
                                            type="password"
                                            onChange={(e) =>
                                                setOldPassword(e.target.value)
                                            }
                                            value={oldPassword}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={3}>
                                        <Form.Label className="">
                                            New Password
                                        </Form.Label>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Control
                                            className=""
                                            type="password"
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            value={newPassword}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                        <Form.Text
                                            className="text-muted"
                                            style={{ fontStyle: "italic" }}
                                        >
                                            Password must be longer than 5
                                            characters, contain at least 1
                                            uppercase character and at least 1
                                            digit.
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                            </>
                        )}
                    </Col>

                    <Col sm={6}>
                        {pageState === STATES.SUCCESS && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.75 }}
                            >
                                <CheckMarkSVG />
                                <div
                                    style={{
                                        display: "inline-block",
                                        marginLeft: 10,
                                        color: "#0c3",
                                    }}
                                >
                                    Successful change.
                                </div>
                            </motion.div>
                        )}
                        {pageState === STATES.FAILURE && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.75 }}
                            >
                                <CrossSVG />
                                <div
                                    style={{
                                        display: "inline-block",
                                        marginLeft: 10,
                                        color: "#F36363",
                                    }}
                                >
                                    Unsuccessful change. Check password and try
                                    again.
                                </div>
                            </motion.div>
                        )}
                    </Col>
                </Row>

                <button
                    className="mindPortalButton primary"
                    onClick={savePassword}
                >
                    Confirm
                </button>
            </Form>
        </div>
    );
};

export default PasswordChangeTab;
