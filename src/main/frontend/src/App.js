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
import TestPage from "./pages/TestPage";
import DashBoardPage from "./pages/DashBoardPage";
import TestOptionsPage from "./pages/TestOptionsPage";

function App() {
    return (
        <ProvideAuth>
            <Router>
                <Switch>
                    {/* Private routes, all pages should be a private route, only login/signup are not */}
                    <PrivateRoute path="/dashboard">
                        <DashBoardPage />
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

                    <Route path="/testOptions">
                        {/* <h1>Sign up</h1> */}
                        <TestOptionsPage />
                    </Route>

                    <Route path="/test">
                        {/* <h1>Sign up</h1> */}
                        <TestPage />
                    </Route>

                    {/* Redirect to dashboard when user is logged in */}
                    <Route path="/">
                        <Redirect to="/dashboard" />
                    </Route>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}

export default App;
