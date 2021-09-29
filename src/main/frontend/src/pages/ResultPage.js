import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";
import {Col, Container, Row,Carousel} from "react-bootstrap";
import "../styles/Result.scss";


const ResultPage = () => {


    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col className="Result result">
                        <h1>Your result is well.</h1>
                        <p>What does my score mean?</p>
                        <p>Suggestion</p>
                    </Col>
                    <Col className="Result video">
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
