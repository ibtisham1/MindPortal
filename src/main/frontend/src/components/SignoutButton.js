import React, { useState } from "react";
import useAuth from "../services/useAuth";
import { Button, Modal } from "react-bootstrap";

const SignoutButton = ({ callback }) => {
    let auth = useAuth();
    let [showModal, setShowModal] = useState(false);

    const signoutPressed = () => {
        setShowModal(false);
        auth.signout(callback);
    };

    return (
        <>
            <Button variant="outline-light" onClick={() => setShowModal(true)}>
                Sign out
            </Button>

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
