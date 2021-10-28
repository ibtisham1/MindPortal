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

const Header = (props) => {
    const auth = useAuth();
    let history = useHistory();

    const refreshPage = () => {
        history.push("/");
    };

    return (
        <Navbar
            fluid
            className="header"
            bg="dark"
            variant="dark"
            expand="lg"
            sticky="top"
        >
            <Container fluid>
                <Nav className="header__brand">
                    <Nav.Link to="/">
                        <NavbarBrand>MindPortal</NavbarBrand>
                    </Nav.Link>
                </Nav>

                <Nav className="justify-content-end">
                    {/* Note: Need to use as={Link} from react-router so the routing works */}
                    <Nav.Link as={Link} to="/">
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
