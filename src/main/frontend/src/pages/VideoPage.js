import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import {Col, Container, Row, Carousel, Card, Button, Jumbotron} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Video.scss";


const VideoPage = () => {

    function ControlledCarousel() {
        const [index, setIndex] = useState(0);

        const handleSelect = (selectedIndex, e) => {
            var carouselScope = document.getElementById("videos")
            var videos = carouselScope.getElementsByTagName("iframe");
            videos[index].src = videos[index].src;
            setIndex(selectedIndex);
        };

        return (
            <Carousel id="videos" activeIndex={index} onSelect={handleSelect} interval={null}>
                <Carousel.Item>
                    <iframe id = "test"
                            width="90%" height="700" src = "https://www.youtube.com/embed/XyNlqQId-nk"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                </Carousel.Item>
                <Carousel.Item>
                    <iframe width="90%%" height="700" src="https://www.youtube.com/embed/DXUAyRRkI6k"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                </Carousel.Item>
                <Carousel.Item>
                    <iframe width="90%%" height="700" src="https://www.youtube.com/embed/eX2qFMC8cFo"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                </Carousel.Item>
            </Carousel>
        );
    }

    return (
        <div>
            <Header />
            <Container fluid className="Video page">
                <Jumbotron>
                    <Row>
                        <Col className="Video video">
                            <h2>Enjoy these funny cat videos!</h2>
                            <p>  </p>
                            <p>  </p>
                            <p>  </p>
                            <p>  </p>
                            <ControlledCarousel />
                        </Col>
                    </Row>
                </Jumbotron>

            </Container>

        </div>
    );
};

export default VideoPage;
