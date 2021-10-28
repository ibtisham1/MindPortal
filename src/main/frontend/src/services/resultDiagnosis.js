import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";
import {Col, Container, Row,Carousel, Button} from "react-bootstrap";
import { useState } from "react";
import ReactDOM from 'react-dom';
import "../styles/TestForm.scss";
import { useHistory, useLocation } from "react-router";
import axiosConfig from "../services/axiosConfig";

export const ResultDiagnosis=()=>{
    let location = useLocation();
    let history = useHistory();
    const auth = useAuth();
    const user = auth.user;

    let { from } = location.state || { from: { pathname: "/" } };

    const config = {
        headers: { Authorization: `Bearer ${auth.token}` },
    };

    function postResult(stringAnswer, diagnosis){
        localStorage.setItem("name", diagnosis);
            axiosConfig
                .post(
                    "/questionnaireResponses",
                    {
                        responses: stringAnswer,
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email

                        }

                    }, config
                )
                .then((result) => {
                    console.log(result);

                })
                .catch((err) => {
                    console.log(err);
                });
            axiosConfig
                .post(
                    "/diagnoses",
                    {
                        diagnosisType: diagnosis,
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email

                        }

                    }, config
                )
                .then((result) => {
                    console.log(result);

                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(localStorage.getItem("name"));

    }
    function getDiagnosis(){
        let name = localStorage.getItem("name");
        return name;
    }
    return {
        postResult,
        getDiagnosis,
    };

}
export default ResultDiagnosis;