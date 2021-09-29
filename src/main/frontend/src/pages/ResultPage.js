import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Card} from "react-bootstrap";
import "../styles/Result.scss";


const ResultPage = () => {

    return (
        <div>
            <Header />
            <Container fluid className="Result page">
                <Row>
                    <Col className="Result result">
                        <h2>Your result is well.</h2>
                        <Card className="Result card">
                            <Card.Body>
                                <Card.Title>
                                    What does my score mean?
                                </Card.Title>
                                <Card.Text>
                                    Description of the K10 result
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <h5>Suggestions</h5>
                        <Card className="Result card">
                            <Card.Body>
                                <Card.Title>
                                    Suggestions
                                </Card.Title>
                                <Card.Text>
                                    Type of Suggestions
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="Result card">
                            <Card.Body>
                                <Card.Title>
                                    Suggestions
                                </Card.Title>
                                <Card.Text>
                                    Type of Suggestions
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="Result video">
                        <h2>We are here to help you!</h2>
                        <Carousel interval={null}>
                            <Carousel.Item>
                                <iframe width="100%" height="315" src = "https://www.youtube.com/embed/XyNlqQId-nk"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                </iframe>
                            </Carousel.Item>
                            <Carousel.Item>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/DXUAyRRkI6k"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                </iframe>
                            </Carousel.Item>
                            <Carousel.Item>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/eX2qFMC8cFo"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                </iframe>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default ResultPage;
