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
import ResultPage from "./pages/ResultPage";
import TestPage from "./pages/TestPage";
import DashBoardPage from "./pages/DashBoardPage";
import SmilePage from "./pages/SmilePage";
import TestOptionsPage from "./pages/TestOptionsPage";
import AudioPage from "./pages/AudioPage";
import VideoPage from "./pages/VideoPage";

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

                    <PrivateRoute path="/smile">
                        <SmilePage />
                    </PrivateRoute>

                    <PrivateRoute path="/result">
                        <ResultPage />
                    </PrivateRoute>

                    <PrivateRoute path="/audio">
                        <AudioPage />
                    </PrivateRoute>

                    <PrivateRoute path="/video">
                        <VideoPage />
                    </PrivateRoute>

                    <PrivateRoute path="/testOptions">
                        <TestOptionsPage />
                    </PrivateRoute>

                    <PrivateRoute path="/test">
                        <TestPage />
                    </PrivateRoute>

                    {/* Public routes */}
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/signup">
                        <SignUpPage />
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
