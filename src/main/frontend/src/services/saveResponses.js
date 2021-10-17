import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../services/axiosConfig";



export const saveResponses = () => {
    //return useContext(respContext);
    function putResponse() {
        console.log("i am here");
        axiosConfig
            .put(
                "/questionnaireResponses",
                {
                    questionnaireResponsesId: 43,
                    response: "aaaaaa"
                }
            )
            .then((result) => {
                console.log(result);

            })
            .catch((err) => {
                console.log(err);
            });
    }
    return {
        putResponse,
    };
};

export default saveResponses;
