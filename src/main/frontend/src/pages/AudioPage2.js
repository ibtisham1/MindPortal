import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Card, Button, OverlayTrigger ,Tooltip} from "react-bootstrap";
import "../styles/Audio2.scss";


const AudioPage2 = () => {

    const [index, setIndex] = useState(0);

    function Pause(){
        var audioPlayer = document.getElementById("music");
        audioPlayer.pause();
        var card1 = document.getElementById("card1");
        card1.src = "https://i.imgur.com/r6Vf89M.jpg";
        var card2 = document.getElementById("card2");
        card2.src = "https://i.imgur.com/F1yv054.jpg";
        var card3 = document.getElementById("card3");
        card3.src = "https://i.imgur.com/7atDpKE.jpg";
    }

    function Play(num){
        var audioPlayer = document.getElementById("music");
        var card1 = document.getElementById("card1");
        var card2 = document.getElementById("card2");
        var card3 = document.getElementById("card3");

       Pause();
        switch (num) {
            case 1:
                audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3";
                card1.src = "https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif";
                break;
            case 2:
                audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwavesno-2-37-min.mp3";
                card2.src = "https://i.imgur.com/1QYu9wS.gif";
                break;
            case 3:
                audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-3-45-min.mp3";
                card3.src = "https://i.imgur.com/Sk8uISa.gif";
                break;
        }
        audioPlayer.play();
        console.log(num);
    }

    return (
        <div>
            <Header />
            <Container fluid className="Audio2 page">

                <audio id="music" preload="true" autoPlay="true">
                    <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                </audio>
                <Row>
                    <OverlayTrigger overlay={<Tooltip id="tooltip">Press the buttons below to change tracks!</Tooltip>} placement="bottom">
                        <h2>Relax along with some binaural beats~</h2>
                    </OverlayTrigger>
                </Row>
                <p></p>
                <Row>
                    <Col className="Audio2 result">
                        <Card className="Audio2 card">
                            <Card.Img id="card1" variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio2 gif"/>
                            <Card.Body>
                                <Card.Title>
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text>
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <Button variant="dark" className="Audio2 button" size="lg" onClick={() => Play(1)}>Play</Button>
                                <Button variant="dark" className="Audio2 button" size="lg" onClick={Pause}>Pause</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="Audio2 result">
                        <Card className="Audio2 card">
                            <Card.Img id="card2" variant="top" src="https://i.imgur.com/1QYu9wS.gif" className="Audio2 gif"/>
                            <Card.Body>
                                <Card.Title>
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text>
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <Button variant="dark" className="Audio2 button" size="lg" onClick={() => Play(2)}>Play</Button>
                                <Button variant="dark" className="Audio2 button" size="lg" onClick={Pause}>Pause</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="Audio2 result">
                        <Card className="Audio2 card">
                            <Card.Img id="card3" variant="top" src="https://i.imgur.com/Sk8uISa.gif" className="Audio2 gif"/>
                            <Card.Body>
                                <Card.Title>
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text>
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <Button variant="dark" className="Audio2 button" size="lg" onClick={() => Play(3)}>Play</Button>
                                <Button variant="dark" className="Audio2 button" size="lg" onClick={Pause}>Pause</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AudioPage2;
