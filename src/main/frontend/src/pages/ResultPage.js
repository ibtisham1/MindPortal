import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Card, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Result.scss";
import axiosConfig from "../services/axiosConfig";
import {useHistory, useLocation} from "react-router";
import {useAuth} from "../services/useAuth";
import ResultDiagnosis from "../services/resultDiagnosis";


const ResultPage = () => {
    let location = useLocation();
    let history = useHistory();
    const auth = useAuth();
    const user = auth.user;
    let rD= ResultDiagnosis();

    let { from } = location.state || { from: { pathname: "/" } };

    const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
    };

    function getDiagnosis(){
        axiosConfig
            .get(`/diagnosis/${user.id}`, config)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function getAnswer(){
        let answer=rD.getDiagnosis();

        let paragraphOutput;
        if (answer=="well"){
            paragraphOutput="The diagnosis states that your result is well.\n" +
                "Please enjoy the calming tunes in your Moments-to-Appreciate page." +
                "And if you are ever feeling distressed, feel free to take the test again.";

        }
        else if (answer=="mild"){
            paragraphOutput="The diagnosis states that your result is mild.\n" +
                "We see that you mild levels of anxiety and/or depression." +
                "Please enjoy the calming tunes in yours Moments-to-Appreciate page." +
                "We hope the soothing tunes will help you out.";

        }
        else if (answer=="moderate"){
            paragraphOutput="The diagnosis states that your result is moderate.\n" +
                "We see that you moderate levels of anxiety and/or depression." +
                "We recommend you to seek Professional help in the link given below." +
                "Also please feel free to listen to the calming tunes in your Moments-to-Appreciate page " +
                "to help ease the distress";

        }
        else if (answer=="severe"){
            paragraphOutput="The diagnosis states that your result is severe.\n" +
                "We see that you severe levels of anxiety and/or depression." +
                "We recommend you to to seek Professional help in the link given below, and call the Suicide Prevention Hotline if necessary. " +
                "Also please feel free to listen to the calming tunes in your Moments-to-Appreciate page " +
                "to help ease the distress";

        }
        return paragraphOutput;
        //return (rD.getDiagnosis());

    }

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
                            width="100%" height="315" src = "https://www.youtube.com/embed/XyNlqQId-nk"
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
        );
    }

    return (
        <div>
            <Header />
            <Container fluid className="Result page">
                <Row>
                    <Col className="Result result">
                        <h2>{getAnswer()}</h2>
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
                                    <Link
                                        to={{
                                            pathname: "/audio",
                                            state: [{diagnosis: 'well'}]
                                        }}
                                    >Link to audio page</Link>
                                    Type of Suggestions
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="Result video">
                        <h2>We are here to help you!</h2>
                        <ControlledCarousel />
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default ResultPage;
