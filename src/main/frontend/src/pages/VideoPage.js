import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Card, Button} from "react-bootstrap";
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
                            width="80%" height="700" src = "https://www.youtube.com/embed/XyNlqQId-nk"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                </Carousel.Item>
                <Carousel.Item>
                    <iframe width="80%" height="700" src="https://www.youtube.com/embed/DXUAyRRkI6k"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                </Carousel.Item>
                <Carousel.Item>
                    <iframe width="80%" height="700" src="https://www.youtube.com/embed/eX2qFMC8cFo"
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
                <Row>
                    <Col className="Video video">
                        <h2>We are here to help you!</h2>
                        <ControlledCarousel />
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default VideoPage;
