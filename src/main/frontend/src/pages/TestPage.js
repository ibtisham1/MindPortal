import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Button} from "react-bootstrap";
import { useState } from "react";
import ReactDOM from 'react-dom';
import "../styles/TestForm.css";




const TestPage = () => {
    const questionIDs = [[
        { id: 1, name: "None of the time", isChecked: false },
        { id: 2, name: "A little of the time", isChecked: false },
        { id: 3, name: "Some of the time", isChecked: false },
        { id: 4, name: "Most of the time", isChecked: false },
        { id: 5, name: "All of the time", isChecked: false }
        ],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }],
        [{ id: 1, name: "None of the time", isChecked: false },
            { id: 2, name: "A little of the time", isChecked: false },
            { id: 3, name: "Some of the time", isChecked: false },
            { id: 4, name: "Most of the time", isChecked: false },
            { id: 5, name: "All of the time", isChecked: false }]];

    const [answers, setAnswers] = useState(questionIDs);

    function record(e, num) {
        const value = e.target.value;
        const newAnswers = [...answers];
        newAnswers[num].map((item) => {
            item.isChecked = item.id === +value;
            return item;
        });
        setAnswers(newAnswers);
    }

    return (
        <div>

            <Header />
                <Row>
            <Col>

                <h1>K10 TEST</h1>
                <row>


                <h4>About how often did you feel tired out for no good reason?</h4>
                {answers[0].map((item, index) => (
                    <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e, 0)}
                            checked={item.isChecked}
                        />
                        {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>

                ))}
                </row>
                <row>
                    <h4>About how often did you feel nervous?</h4>
                    {answers[1].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e, 1)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel so nervous that nothing could calm you down?</h4>
                    {answers[2].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,2)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel hopeless?</h4>
                    {answers[3].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,3)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel restless or fidgety?</h4>
                    {answers[4].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,4)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel so restless you could not sit still?</h4>
                    {answers[5].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,5)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel depressed?</h4>
                    {answers[6].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,6)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel that everything was an effort?</h4>
                    {answers[7].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,7)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel so sad that nothing could cheer you up?</h4>
                    {answers[8].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,8)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel worthless?</h4>
                    {answers[9].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => record(e,9)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <Container>
                        <center>
                            <bt><Button variant="primary" size="lg" as="input" type="submit" value="Submit" />{' '}</bt>
                        </center>
                        </Container>
                </row>
            </Col>
                    <Col xs={2} style={{backgroundColor: 'black'}}>
                        <h3> What is the K10 Test </h3>
                            <st><a href="https://www.tac.vic.gov.au/files-to-move/media/upload/k10_english.pdf" target="_blank">Learn more here</a></st>
                    </Col>
                </Row>
        </div>
    );

};

export default TestPage;