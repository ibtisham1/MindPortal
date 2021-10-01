import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";
import {Col, Container, Row,Carousel} from "react-bootstrap";
import { useState } from "react";
import ReactDOM from 'react-dom';
import "../styles/TestForm.css";




const TestPage = () => {
    const preSet = [[
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

    const [data, setData] = useState(preSet);

    function handleChange(e, num) {
        const value = e.target.value;
        const modifiedData = [...data];
        modifiedData[num].map((item) => {
            item.isChecked = item.id === +value;
            return item;
        });
        setData(modifiedData);
    }

    return (
        <div>

            <Header />
                <Row>
            <Col>

                <h1>K10 TEST</h1>
                <row>


                <h4>About how often did you feel tired out for no good reason?</h4>
                {data[0].map((item, index) => (
                    <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e, 0)}
                            checked={item.isChecked}
                        />
                        {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>

                ))}
                </row>
                <row>
                    <h4>About how often did you feel nervous?</h4>
                    {data[1].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e, 1)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel so nervous that nothing could calm you down?</h4>
                    {data[2].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,2)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel hopeless?</h4>
                    {data[3].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,3)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel restless or fidgety?</h4>
                    {data[4].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,4)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel so restless you could not sit still?</h4>
                    {data[5].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,5)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel depressed?</h4>
                    {data[6].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,6)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel that everything was an effort?</h4>
                    {data[7].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,7)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel so sad that nothing could cheer you up?</h4>
                    {data[8].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,8)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <row>
                    <h4>About how often did you feel worthless?</h4>
                    {data[9].map((item, index) => (
                        <span key={item.id}>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChange(e,9)}
                            checked={item.isChecked}
                        />
                            {item.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    </span>
                    ))}
                </row>
                <button>
                    Submit
                </button>
            </Col>
                    <Col xs={2} style={{backgroundColor: 'black'}}>
                        <h3> What is the K10 Test </h3>
                    </Col>
                </Row>
        </div>
    );

};

export default TestPage;