import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../services/axiosConfig";
import {useLocation} from "react-router";
import {useAuth} from "./useAuth";



export const SaveResponses = () => {



    //return useContext(respContext);
    function PutResponse() {
        let location = useLocation();
        const auth = useAuth();
        const user = auth.user;

        let { from } = location.state || { from: { pathname: "/" } };
        console.log("i am here");
        axiosConfig
            .put(
                "/questionnaireResponses",
                {
                    responses: "frontendinsert",
                    user: user

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
        putResponse: PutResponse,
    };
};

export default SaveResponses;
