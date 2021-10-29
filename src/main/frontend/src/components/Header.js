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
import SignoutButton from "./SignoutButton";
import "../styles/Header.scss";
import { FaBrain } from "react-icons/fa";

const Header = (props) => {
    const auth = useAuth();
    let history = useHistory();

    const refreshPage = () => {
        history.push("/");
    };

    return (
        <Navbar fluid className="header" expand="lg" sticky="top">
            <Container fluid>
                <Nav>
                    <Nav.Link as={Link} to="/dashboard">
                        <NavbarBrand className="header__brand">
                            <FaBrain
                                className="header__brand__logo"
                                size="large"
                            />{" "}
                            <p className="header__brand__text">MindPortal</p>
                        </NavbarBrand>
                    </Nav.Link>
                </Nav>

                <Nav className="justify-content-end">
                    {/* Note: Need to use as={Link} from react-router so the routing works */}
                    <Nav.Link
                        as={Link}
                        to="/dashboard"
                        className="header__link"
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/audio">
                        Mindfulness-Space
                    </Nav.Link>
                    <Nav.Link as={Link} to="/video">
                        Moments-To-Appreciate
                    </Nav.Link>
                    <Nav.Link as={Link} to="/smile">
                        Smile Challenge
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                        Profile
                    </Nav.Link>
                    <SignoutButton callback={refreshPage} />
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
