import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import useAuth from "../../services/useAuth";
import { Row, Col, Form, Button } from "react-bootstrap";
import "../../styles/Profile.scss";

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

    useEffect(() => {
        if (loading) {
            setIsEnabled(false);
        } else {
            setIsEnabled(true);
        }
    }, [loading]);

    const update = () => {
        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setLoading(true);
            updateDetails(firstName, lastName, email, onSuccess, onFailure);
        }
    };

    const onSuccess = () => {
        setLoading(false);
        console.log("success");
    };

    const onFailure = () => {
        setLoading(false);
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

    function isValidEmailFormat() {
        return false;
    }

    return (
        <div className="edit form">
            <Form.Group as={Row} className="edit form__row align-items-center">
                <Col sm={2}>
                    <Form.Label className="edit form__label">
                        First Name
                    </Form.Label>
                </Col>
                <Col sm={{ span: 3 }}>
                    <Form.Control
                        className="edit form__input"
                        type="text"
                        placeholder={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        isInvalid={!!errors.firstName}
                        value={firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="edit form__row align-items-center">
                <Col sm={2}>
                    <Form.Label className="edit form__label">
                        Last Name
                    </Form.Label>
                </Col>
                <Col sm={{ span: 3 }}>
                    <Form.Control
                        type="text"
                        placeholder={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        isInvalid={!!errors.lastName}
                        value={lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="edit form__row align-items-center">
                <Col sm={2}>
                    <Form.Label className="edit form__label">Email</Form.Label>
                </Col>
                <Col sm={{ span: 3 }}>
                    <Form.Control
                        type="email"
                        placeholder={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                        value={email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <div style={{ marginTop: "1rem" }}>
                {/* {loading ? <div>Loading</div> : ""} */}
                <Button onClick={update} disabled={!isEnabled}>
                    {" "}
                    Save{" "}
                </Button>
            </div>
        </div>
    );
};

export default ProfileEditTab;
