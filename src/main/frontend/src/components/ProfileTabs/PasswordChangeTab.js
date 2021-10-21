import React, { useState, useEffect } from "react";
import useAuth from "../../services/useAuth";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "../../styles/Profile.scss";
import CheckMarkSVG from "../CheckMarkSVG";
import { motion } from "framer-motion";

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
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const { changePassword } = auth;
    const [userFeedback, setUserFeedback] = useState(null);
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
        setUserFeedback(null);
        setPageState(STATES.DEFAULT);
        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // setLoading(true);
            setPageState(STATES.LOADING);
            changePassword(oldPassword, newPassword, onSuccess, onFailure);
        }
    };

    const onSuccess = () => {
        // setLoading(false);
        setPageState(STATES.SUCCESS);
        // display a success message
        setUserFeedback("Successful change");
        setNewPassword("");
        setOldPassword("");
        console.log("YAY changed");
    };

    const onFailure = () => {
        // setLoading(false);
        setPageState(STATES.FAILURE);
        // set any errors
        setUserFeedback("Unsuccesful change");
        console.log("NOPE");
    };

    return (
        <div className="reset-password">
            <Form>
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

                    <Col sm={2}>
                        {pageState === STATES.SUCCESS && (
                            <motion.div>
                                <CheckMarkSVG />
                                Sucessful change
                            </motion.div>
                        )}
                        {pageState === STATES.FAILURE && (
                            <motion.div>
                                <CheckMarkSVG />
                                Unsuccessful change.
                            </motion.div>
                        )}
                    </Col>
                </Row>

                <Button onClick={savePassword}>Confirm</Button>
                <div>{userFeedback ?? <div>{userFeedback}</div>}</div>
            </Form>
        </div>
    );
};

export default PasswordChangeTab;
