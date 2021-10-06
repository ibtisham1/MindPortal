import React from "react";
import { useAuth } from "../services/useAuth";
import Header from "../components/Header";

const HomePage = () => {
    const auth = useAuth();

    return (
        <div>
            <Header />
            <h1>Welcome, {auth.user != null ? auth.user.firstName : ""}</h1>
        </div>
    );
};

export default HomePage;
