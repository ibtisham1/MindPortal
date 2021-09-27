import { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../services/axiosConfig";

const dummy_user = {
    firstName: "DummyUserFirst",
    lastName: "DummyUserLast",
    email: "DummyUserEmail",
};

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const tokenStorage = localStorage.getItem("jwt-token")
        ? localStorage.getItem("jwt-token")
        : "";

    const userStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";

    const [user, setUser] = useState(userStorage || null);
    const [token, setToken] = useState(tokenStorage || null);

    const signin = (email, password, success, failure) => {
        // do sign in functionality and return user
        axiosConfig
            .post("/authenticate", {
                username: email,
                password: password,
            })
            .then((result) => {
                console.log(result);
                // setUser(dummy_user);
                setUser(result.data.user);
                setToken(result.data.token);
                localStorage.setItem("jwt-token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                success();
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
                setToken(null);
                failure();
            });

        // return user;
        // return user deatils from server.
    };

    const signup = (email, password, firstName, lastName, success, failure) => {
        // set user to server

        setUser(null);
        axiosConfig
            .post("/register", {
                email,
                password,
                firstName,
                lastName,
            })
            .then((result) => {
                console.log(result);
                setUser(dummy_user);
                // setUser(result.data.user);
                // setToken(result.data.token);
                // localStorage.setItem("jwt-token", result.data.token);
                success();
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
                setToken(null);
                failure();
            });
    };

    const signout = (cb) => {
        // setUser(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        if (cb) {
            cb();
        } else {
            window.location.href = "/";
        }
    };

    useEffect(() => {}, [user]);

    return { user, signin, signup, signout, token };
}

export default useAuth;
