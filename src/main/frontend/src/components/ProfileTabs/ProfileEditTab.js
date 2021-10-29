import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
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

const ProfileEditTab = (props) => {
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const { updateDetails } = auth;
    const user = props.user ? props.user : null;
    const [email, setEmail] = useState(user.email || "");
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [errors, setErrors] = useState({});
    const [isEnabled, setIsEnabled] = useState(true);
    const [pageState, setPageState] = useState(STATES.DEFAULT);

    useEffect(() => {
        if (pageState === STATES.LOADING) {
            setIsEnabled(false);
        } else {
            setIsEnabled(true);
        }
    }, [pageState]);

    const update = () => {
        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setPageState(STATES.LOADING);
            updateDetails(firstName, lastName, email, onSuccess, onFailure);
        }
    };

    const onSuccess = () => {
        setPageState(STATES.SUCCESS);
        console.log("success");
    };

    const onFailure = () => {
        setPageState(STATES.FAILURE);
        console.log("failure");
    };

    const findErrors = () => {
        const errors = {};
        if (firstName === "") errors.firstName = "First name cannot be blank";
        if (lastName === "") errors.lastName = "Last name cannot be blank";
        if (email === "") errors.email = "Username cannot be blank";
        else if (email.length < 3) errors.email = "Enter a valid email";

        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            errors.email = "Enter a valid email";
        }
        return errors;
    };

    return (
        <div className="edit form">
            <Row>
                <p>Make any edits to your profile information here.</p>
            </Row>
            <Row>
                <Col sm={6}>
                    {pageState === STATES.LOADING ? (
                        <Spinner animation="border" variant="info" size="lg" />
                    ) : (
                        <>
                            <Form.Group
                                as={Row}
                                className="edit form__row align-items-center"
                            >
                                <Col sm={3}>
                                    <Form.Label className="edit form__label">
                                        First Name
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        className="edit form__input"
                                        type="text"
                                        placeholder={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        isInvalid={!!errors.firstName}
                                        value={firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="edit form__row align-items-center"
                            >
                                <Col sm={3}>
                                    <Form.Label className="edit form__label">
                                        Last Name
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        isInvalid={!!errors.lastName}
                                        value={lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="edit form__row align-items-center"
                            >
                                <Col sm={3}>
                                    <Form.Label className="edit form__label">
                                        Email
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="email"
                                        placeholder={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        isInvalid={!!errors.email}
                                        value={email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </>
                    )}
                </Col>
                <Col sm={6} className="align-self-center">
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
                                Unsuccessful change.
                            </div>
                        </motion.div>
                    )}
                </Col>
            </Row>

            <Row className="mt-2">
                <Col sm={6}>
                    <Button
                        className="edit save__btn"
                        onClick={update}
                        disabled={!isEnabled}
                    >
                        {" "}
                        Save{" "}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default ProfileEditTab;
