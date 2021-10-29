//import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Button, Form} from "react-bootstrap";
import { useState } from "react";
import ReactDOM from 'react-dom';
import "../styles/TestForm.scss";
import { useHistory, useLocation } from "react-router";
import axiosConfig from "../services/axiosConfig";
import ResultDiagnosis from "../services/resultDiagnosis";


import React, { Component } from 'react';






const TestPage = () => {


    let location = useLocation();
    let history = useHistory();
    const auth = useAuth();
    const user = auth.user;
    let rD =ResultDiagnosis();


    let { from } = location.state || { from: { pathname: "/" } };

    const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
    };

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



    function checkSubmission(num){
        let counter=0;
        for(let i=0;i<questionIDs.length;i++){
            answers[i].map((item) => {
                if (item.isChecked==true){
                    counter++;
                }
            });
        }
        if(num=="1"){
            if(!(counter<10)){
                resultCalculation();
            }
        }
        if(num=="0") {
            if (counter < 10) {
                return <p className="Header message" style={{color: "red"}}>Please fill up all the questions in the
                    form</p>;
            }
            return <p className="Header secondMessage" style={{color: "green"}}>Eligible for submission</p>;
        }
    }

    function resultCalculation(){
        const allAnswers=[]; //All the answers of the questionnaire
        for(let i=0;i<questionIDs.length;i++){
            answers[i].map((item) => {
                if (item.isChecked==true){
                    allAnswers.push(item.id);
                }
            });
        }
        let finalAnswer=0; //the final calculation
        for(let i=0;i<allAnswers.length;i++){
            finalAnswer+=allAnswers[i];
        }
        let stringAnswer=finalAnswer.toString();
        let diagnosis;
        if((finalAnswer>=10) &&(finalAnswer<=19)){
            diagnosis="well";
        }
        else if ((finalAnswer>=20) &&(finalAnswer<=24)){
            diagnosis="mild";
        }
        else if ((finalAnswer>=25) &&(finalAnswer<=29)){
            diagnosis="moderate";
        }
        else{
            diagnosis="severe";
        }
        rD.postResult(stringAnswer,diagnosis);

        history.push("/result");

    }




    return (
        <div>

            <Header />
            <Row >
                <Col >
                    <Container>

                        <h1 className="Header headings">K10 TEST</h1>
                        <row>

                            <h3 className="Header supreme">About how often did you feel tired out for no good reason?*</h3>
                            {answers[0].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 0)}
                            checked={item.isChecked}
                            label={item.name}
                        />


                    </span>

                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel nervous?*</h3>
                            {answers[1].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 1)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel so nervous that nothing could calm you down?*</h3>
                            {answers[2].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 2)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel hopeless?*</h3>
                            {answers[3].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 3)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel restless or fidgety?*</h3>
                            {answers[4].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 4)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel so restless you could not sit still?*</h3>
                            {answers[5].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 5)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel depressed?*</h3>
                            {answers[6].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 6)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel that everything was an effort?*</h3>
                            {answers[7].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 7)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel so sad that nothing could cheer you up?*</h3>
                            {answers[8].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 8)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <row>
                            <h3 className="Header supreme">About how often did you feel worthless?*</h3>
                            {answers[9].map((item, index) => (
                                <span className="Header spanner" key={item.id}>
                        <Form.Check
                            size={20}
                            type="Checkbox"
                            inline
                            value={item.id}
                            onChange={(e) => record(e, 9)}
                            checked={item.isChecked}
                            label={item.name}
                        />

                    </span>
                            ))}
                        </row>
                        <Row>
                            <h4 className="Header supreme"></h4>
                        </Row>

                        <row>

                            <p className="Header buttoner"><Button onClick={() => checkSubmission("1")} variant="primary" size="lg" as="input" type="submit" value="Submit" />{''}</p>
                        </row>
                        <row>
                            {checkSubmission("0")}
                        </row>
                    </Container>
                </Col>
            </Row>
        </div>
    );

};

export default TestPage;