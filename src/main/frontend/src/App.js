import {
    Switch,
    Route,
    Redirect,
    Link,
    HashRouter as Router,
    // BrowserRouter as Router,
} from "react-router-dom";
import { ProvideAuth } from "./services/useAuth";
import { useEffect, useState } from "react";
import axiosConfig from "./services/axiosConfig";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <ProvideAuth>
            <Router>
                <Switch>
                    {/* Protected routes */}
                    <PrivateRoute path="/dashboard">
                        <HomePage />
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <ProfilePage />
                    </PrivateRoute>

                    {/* Public routes */}
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/signup">
                        {/* <h1>Sign up</h1> */}
                        <SignUpPage />
                    </Route>

                    <Route path="/">
                        <Redirect to="/dashboard" />
                        {/* <Route path="/">
                        <HomePage /> */}
                    </Route>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}

export default App;
