import React, { useState } from "react";
import useAuth from "../services/useAuth";
import { Button, Modal, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const SignoutButton = ({ callback }) => {
    let auth = useAuth();
    let [showModal, setShowModal] = useState(false);

    const signoutPressed = () => {
        setShowModal(false);
        auth.signout(callback);
    };

    return (
        <>
            <Nav.Link
                className="header__link"
                onClick={() => setShowModal(true)}
            >
                Sign out
            </Nav.Link>

            {/* variant="outline-light"
                style={{ marginLeft: 3 }}
                onClick={() => setShowModal(true)}
            >
                Sign out
            </Button> */}

            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Are you sure you want to sign out?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        I've changed my mind
                    </Button>
                    <Button variant="primary" onClick={signoutPressed}>
                        I actually do want to sign out
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignoutButton;
