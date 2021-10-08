import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import Header from "../components/Header";
import useAuth from "../services/useAuth";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import "../styles/Profile.scss";
import axios from "axios";
import { BsFillPencilFill } from "react-icons/bs";

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
                        title="Profile"
                        className="profile__tab"
                    >
                        <Profile user={user} />
                    </Tab>
                    <Tab
                        eventKey="edit"
                        title={
                            <span>
                                <BsFillPencilFill /> Edit Profile
                            </span>
                        }
                        className="profile__tab"
                    >
                        <EditProfile />
                    </Tab>
                    <Tab
                        eventKey="reset"
                        title="Reset Password"
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

const EditProfile = () => {
    return <div>Edit profile</div>;
};

const ResetPassword = () => {
    return <div>Reset password</div>;
};

export default ProfilePage;
