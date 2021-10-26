import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Profile.scss";
import { BsPersonCircle } from "react-icons/bs";

const ProfileDetailsTab = (props) => {
    console.log(props.user);
    return (
        <Container className="details">
            <Row>
                <Col sm={3} className="justify-items-center align-self-center">
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
                </Col>
            </Row>

            {/* <Row> */}

            {/* </Row> */}
        </Container>
    );
};

export default ProfileDetailsTab;
