import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import Header from "../components/Header";
import useAuth from "../services/useAuth";
import { Tabs, Tab, Container, Row, Col, Form } from "react-bootstrap";
import "../styles/Profile.scss";
import axios from "axios";
import {
    BsFillPencilFill,
    BsFillPersonFill,
    BsFillShieldLockFill,
} from "react-icons/bs";

const ProfilePage = () => {
    const auth = useAuth();
    const user = auth.user ? auth.user : null;
    const [key, setKey] = useState("profile");
    const [image, setImage] = useState("");

    return (
        <div className="profile">
            <Header />
            <h1 className="profile__title">My Profile</h1>
            <Container className="profile__tab__container">
                <Tabs
                    id="profile-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="profile__tabs"
                >
                    <Tab
                        eventKey="profile"
                        title={
                            <>
                                <span className="profile__tab__icon">
                                    <BsFillPersonFill />
                                </span>
                                Profile
                            </>
                        }
                        className="profile__tab"
                    >
                        <Profile user={user} />
                    </Tab>
                    <Tab
                        eventKey="edit"
                        title={
                            <>
                                <span className="profile__tab__icon">
                                    <BsFillPencilFill />
                                </span>
                                Edit Profile
                            </>
                        }
                        className="profile__tab"
                    >
                        <EditProfile user={user} />
                    </Tab>
                    <Tab
                        eventKey="reset"
                        title={
                            <>
                                <span className="profile__tab__icon">
                                    <BsFillShieldLockFill />
                                </span>
                                Reset Password
                            </>
                        }
                        className="profile__tab"
                    >
                        <ResetPassword />
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

const Profile = (props) => {
    console.log(props.user);
    return (
        <div className="details">
            <Row>
                <Row className="details__row">
                    <Col sm={2} className="details__label">
                        First name
                    </Col>
                    <Col className="details__value">{props.user.firstName}</Col>
                </Row>
                <Row className="details__row">
                    <Col sm={2} className="details__label">
                        Last name
                    </Col>
                    <Col className="details__value">{props.user.lastName}</Col>
                </Row>
                <Row className="details__row">
                    <Col sm={2} className="details__label">
                        Email
                    </Col>
                    <Col className="details__value">{props.user.email}</Col>
                </Row>
            </Row>
        </div>
    );
};

const EditProfile = (props) => {
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const { updateDetails } = auth;
    const user = props.user ? props.user : null;
    const [email, setEmail] = useState(user.email || "");
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [errors, setErrors] = useState({});

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
        // if (password === "") errors.password = "Password cannot be blank";
        // else if (password.length < 4)
        //     errors.password = "Password should be a minimum of 4 characters";

        return errors;
    };

    function isValidEmailFormat() {
        return false;
    }

    return (
        <div>
            Edit profile
            {loading ? <div>Loading</div> : ""}
            <Form.Group as={Row}>
                <Form.Label className="signup form__label">
                    First Name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label className="signup form__label">
                    Last Name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label className="signup form__label">Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <div>firstname: {firstName}</div>
            <div>lastName: {lastName}</div>
            <div>email: {email}</div>
            <button onClick={update}>update</button>
        </div>
    );
};

const ResetPassword = () => {
    return <div>Reset password</div>;
};

export default ProfilePage;
