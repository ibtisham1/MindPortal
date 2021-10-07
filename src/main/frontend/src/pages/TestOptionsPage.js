import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Button, Card} from "react-bootstrap";
import { useState } from "react";
import ReactDOM from 'react-dom';
import "../styles/TestOp.scss";




const TestOptionsPage = () => {

    return(
        <div>
        <Header />
            <Row>
                    <Col xs={2} style={{backgroundColor: 'black'}}>
                        <h3 className="Op columns"> Please select a Mental Health Test </h3>
                    </Col>



        <Col>
            <h1>Mental Health Tests</h1>

            <Container>
        <Card style={{ width: '30rem'}}>
            <Card.Img className="Op imager" variant="top" src="https://i.imgur.com/n04PVbK.png" />
            <Card.Body>
                <Card.Title>K10 Test</Card.Title>
                <Card.Text>
                    An anxiety and depression checklist.
                    Together, these ten questions measure how distressed you’ve been recently, by signs of depression and anxiety.
                </Card.Text>
                <Button variant="primary">Continue</Button>
            </Card.Body>
        </Card>
            </Container>
        </Col>
                <Col>
                    <h1> &nbsp;</h1>
                    <Container>
                    <Card style={{ width: '30rem' }}>
                        <Card.Img className="Op imager" variant="top" src="https://as2.ftcdn.net/v2/jpg/02/35/28/61/500_F_235286187_ocJsF1qxWXpHuH6XsoltpB0SJvcMEX6t.jpg" />
                        <Card.Body>
                            <Card.Title>More Tests</Card.Title>
                            <Card.Text className="Op texter">
                                Currently building.
                            </Card.Text>
                            <Button variant="primary">Continue</Button>
                        </Card.Body>
                    </Card>
                    </Container>
                </Col>
            </Row>
        </div>

    );

};

export default TestOptionsPage;