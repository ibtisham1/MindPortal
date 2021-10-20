import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaBrain } from "react-icons/fa";

const LogoTxt = () => {
    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs={1}>
                    <FaBrain
                        size="large"
                        style={{ maxHeight: 130, color: "#FBDFB6" }}
                    />
                </Col>
                <Col xs={4} className="align-self-center">
                    <Row style={{ color: "#FBDFB6" }}>
                        <h1>Mind Portal</h1>
                    </Row>
                    <Row style={{ color: "#FBDFB6", fontSize: 20 }}>
                        <p>Shine a light on your mental health.</p>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default LogoTxt;
