import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";
// import AuthButton from "../components/AuthButton";
import "../styles/Login.scss";
import { Row, Container, Button, Col, Form, Card } from "react-bootstrap";
import DashBoardHeader from "../components/DashBoardHeader";

const DashBoardPage = () => {
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };


    return (
        <Container fluid className="Dashboard page">
            <DashBoardHeader />
            <Row>
                <Col lg={3} className="DashBoard card">
                    <p></p>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Covid update in your area
                            </Card.Title>
                            <Card.Text>
                                Covid updates explained here ...
                            </Card.Text>
                            <Card.Img src={"https://imageresizer.static9.net.au/JoiR0Yy7d3c-sKWPOZs74n1WrGA=/1600x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2Fb329d945-649a-41e0-89a2-6f4ea7aa821c"}/>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className="DashBoard card">
                    <h1>Welcome to Dashboard</h1>
                    <h2>Hello Kurt!</h2>
                    <h3>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Mental Health Test
                                </Card.Title>
                                <Card.Title>
                                    You have not taken a mental health test yet, click 'Take Test' to continue
                                </Card.Title>
                                <Button variant={"primary"}>
                                    Take Test
                                </Button>
                            </Card.Body>
                        </Card>
                    </h3>
                    <h4>Suggested Actions</h4>
                    <h3>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Moments To Appreciate
                                </Card.Title>
                                <Card.Title>
                                    feature description ...
                                </Card.Title>
                                <Button variant={"secondary"}>
                                    Go
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Moments To Appreciate
                                </Card.Title>
                                <Card.Title>
                                    feature description ...
                                </Card.Title>
                                <Button variant={"secondary"}>
                                    Go
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Other Suggestion
                                </Card.Title>
                                <Card.Title>
                                    feature description ...
                                </Card.Title>
                                <Button variant={"secondary"}>
                                    Go
                                </Button>
                            </Card.Body>
                        </Card>
                    </h3>
                </Col>
            </Row>
        </Container>
    );
};

export default DashBoardPage;
