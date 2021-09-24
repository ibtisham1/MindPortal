import React from "react";
import Header from "../components/Header";
import useAuth from "../services/useAuth";

const ProfilePage = () => {
    const auth = useAuth();
    const user = auth.user ? auth.user : null;
    return (
        <div>
            <Header />
            <h1>Profile Page</h1>
            {user ? <p>first name : {user.firstName}</p> : ""}
        </div>
    );
};

export default ProfilePage;
