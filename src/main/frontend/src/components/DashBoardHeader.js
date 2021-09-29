import React from "react";
import useAuth from "../services/useAuth";
import { Link, useHistory } from "react-router-dom";
import {
    Navbar,
    Button,
    Row,
    Col,
    NavbarBrand,
    Nav,
    Dropdown,
    Image,
    Badge,
    Container,
} from "react-bootstrap";

const DashBoardHeader = (props) => {
    const auth = useAuth();
    let history = useHistory();

    const refreshPage = () => {
        history.push("/");
    };

    return (
        <div>
            <Navbar
                fluid
                className="header"
                bg="dark"
                variant="dark"
                expand="lg"
            >
                <Container fluid>
                    <Nav>
                        <Link to="/">
                            <NavbarBrand>MindPortal</NavbarBrand>
                        </Link>
                        <Link to="/">
                            <NavbarBrand>Home</NavbarBrand>
                        </Link>
                        <Link to="/">
                            <NavbarBrand>Mindfulness-Space</NavbarBrand>
                        </Link>
                        <Link to="/">
                            <NavbarBrand>Moments-To-Appreciate</NavbarBrand>
                        </Link>
                        <Link to="/">
                            <NavbarBrand>Settings</NavbarBrand>
                        </Link>
                        <Link to="/">
                            <NavbarBrand>Sign-Out</NavbarBrand>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default DashBoardHeader;
