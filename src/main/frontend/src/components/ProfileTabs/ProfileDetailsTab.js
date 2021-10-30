import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Profile.scss";
import { BsPersonCircle } from "react-icons/bs";

const ProfileDetailsTab = (props) => {
    console.log(props.user);

    const [completedSmileChallenge, setCompletedSmileChallenge] =
        useState(false);

    useEffect(() => {
        let user = props.user;

        let lastSmile = user.mostRecentSmileChallengePass;
        if (lastSmile != null) {
            // compute diff

            let diff = new Date() - new Date(lastSmile);
            console.log(diff);
            if (diff < 86400000) {
                setCompletedSmileChallenge(true);
            }
        }
    }, []);

    return (
        <Container className="details">
            <Row className="mt-5" sm={7}>
                <Col sm={2} className="justify-items-center align-self-center">
                    <Row>
                        <BsPersonCircle size={60} color={"grey"} />
                    </Row>
                </Col>
                <Col>
                    <Row className="details__row">
                        <Col sm={3} className="details__label">
                            First name
                        </Col>
                        <Col className="details__value">
                            {props.user.firstName}
                        </Col>
                    </Row>
                    <Row className="details__row">
                        <Col sm={3} className="details__label">
                            Last name
                        </Col>
                        <Col className="details__value">
                            {props.user.lastName}
                        </Col>
                    </Row>
                    <Row className="details__row">
                        <Col sm={3} className="details__label">
                            Email
                        </Col>
                        <Col className="details__value">{props.user.email}</Col>
                    </Row>
                    <Row className="details__row">
                        <Col sm={3} className="details__label">
                            Daily Smile Challenge
                        </Col>
                        <Col className="details__value">
                            {completedSmileChallenge
                                ? "completed"
                                : "not completed"}
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* <Row> */}

            {/* </Row> */}
        </Container>
    );
};

export default ProfileDetailsTab;
