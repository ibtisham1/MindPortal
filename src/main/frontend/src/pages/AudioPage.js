import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Card} from "react-bootstrap";
import "../styles/Audio.scss";


const AudioPage = () => {

    function ControlledCarousel() {
        const [index, setIndex] = useState(0);

        const handleSelect = (selectedIndex, e) => {
            var carouselScope = document.getElementById("audios")
            var audio = carouselScope.getElementsByTagName("audio");
            audio[index].src = audio[index].src;
            setIndex(selectedIndex);
        };

        return (
            <Carousel id="audios" activeIndex={index} onSelect={handleSelect} interval={null}>
                <Carousel.Item className="Audio result">
                    <Card className="Audio card" >
                        <Card.Img variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio gif"/>
                        <Card.Body>
                            <Card.Title>
                                Alpha Wave Binaural Beats
                            </Card.Title>
                            <Card.Text>
                                Relax along with some binaural beats~
                            </Card.Text>
                            <audio controls="controls" id="music" preload="true">
                                <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                            </audio>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
                <Carousel.Item className="Audio result">
                    <Card className="Audio card">
                        <Card.Img variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio gif"/>
                        <Card.Body>
                            <Card.Title>
                                Alpha Wave Binaural Beats
                            </Card.Title>
                            <Card.Text>
                                Relax along with some binaural beats~
                            </Card.Text>
                            <audio controls="controls" id="music" preload="true">
                                <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                            </audio>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
                <Carousel.Item className="Audio result">
                    <Card className="Audio card">
                        <Card.Img variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio gif"/>
                        <Card.Body>
                            <Card.Title>
                                Alpha Wave Binaural Beats
                            </Card.Title>
                            <Card.Text>
                                Relax along with some binaural beats~
                            </Card.Text>
                            <audio controls="controls" id="music" preload="true">
                                <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                            </audio>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            </Carousel>
        );
    }

    return (
        <div>
            <Header />
            <Container fluid className="Audio page">
                <Row>
                    <Col className="Audio result">
                        <Card className="Audio card">
                            <Card.Img variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio gif"/>
                            <Card.Body>
                                <Card.Title>
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text>
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <audio controls="controls" id="music" preload="true">
                                    <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                                </audio>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="Audio result">
                        <Card className="Audio card">
                            <Card.Img variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio gif"/>
                            <Card.Body>
                                <Card.Title>
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text>
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <audio controls="controls" id="music" preload="true">
                                    <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                                </audio>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row><Row>
                <Col className="Audio result">
                    <Card className="Audio card">
                        <Card.Img variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio gif"/>
                        <Card.Body>
                            <Card.Title>
                                Alpha Wave Binaural Beats
                            </Card.Title>
                            <Card.Text>
                                Relax along with some binaural beats~
                            </Card.Text>
                            <audio controls="controls" id="music" preload="true">
                                <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                            </audio>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            </Container>

        </div>
    );
};

export default AudioPage;
