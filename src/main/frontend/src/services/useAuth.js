import { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "../services/axiosConfig";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
   

    const [user, setUser] = useState(null);

    const signin = (email, password, success, failure) => {
        // do sign in functionality and return user
        axiosConfig
            .post("/users/login", {
                username: email,
                password: password,
            })
            .then((result) => {
                console.log(result);
                setUser(result.data.userId);
                success();
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
                failure();
            });

        // return user;
        // return user deatils from server.
    };

    const signup = (email, password, success, failure) => {
        // set user to server

        setUser(null);
        axiosConfig
            .post("/users", {
                email,
                password,
            })
            .then((result) => {
                console.log(result);
                setUser(result.data.userId);
                success();
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
                failure();
            });
    };

    const signout = (cb) => {
        // setUser(false);
        setUser(null);
        if (cb) {
            cb();
        } else {
            window.location.href = "/";
        }
    };


    useEffect(() => {}, [user]);

    return { user, signin, signup, signout };
}

export default useAuth;