import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";
// import AuthButton from "../components/AuthButton";
import "../styles/Login.scss";
import { Row, Container, Button, Col, Form } from "react-bootstrap";
import DashBoardHeader from "../components/DashBoardHeader";

const DashBoardPage = () => {
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };


    return (
        <Container fluid className="Login">
            <DashBoardHeader />
            <Row>
                <Col lg={4} className="Login banner">
                    <h2>
                        <Link to="/" className="Login banner__title">
                            MindPortal
                        </Link>
                    </h2>
                </Col>

                <Col className="Login form">
                    <h1>Welcome to Dashboard</h1>
                    <Form>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default DashBoardPage;
