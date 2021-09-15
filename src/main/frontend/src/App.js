import Button from "./components/Button/Button";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { ProvideAuth } from "./services/useAuth";
import { useEffect, useState } from "react";
import axiosConfig from "./services/axiosConfig";

function App() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        axiosConfig
            .get("/users")
            .then((result) => {
                console.log(result.data);
                setUsers(result.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <header>
                <h1>Mind Portal App</h1>

                <h2>Current Users</h2>

                {loading ? (
                    <div>loading....</div>
                ) : (
                    users.map((user) => {
                        return <div>{user.name}</div>;
                    })
                )}

                <Button>Fantastic button</Button>
            </header>
        </div>
    );
}

export default App;
