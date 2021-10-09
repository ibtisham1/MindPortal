import React, { useState, useEffect } from "react";
import useAuth from "../../services/useAuth";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "../../styles/Profile.scss";

const PasswordChangeTab = (props) => {
    const user = props.user;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const { changePassword } = auth;
    const [userFeedback, setUserFeedback] = useState(null);
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        if (loading) {
            setIsEnabled(false);
        } else {
            setIsEnabled(true);
        }
    }, [loading]);

    const savePassword = () => {
        setLoading(true);
        setUserFeedback(null);
        changePassword(oldPassword, newPassword, onSuccess, onFailure);
    };

    const onSuccess = () => {
        setLoading(false);
        // display a success message
        setUserFeedback("Successful change");
        console.log("YAY changed");
    };

    const onFailure = () => {
        setLoading(false);
        // set any errors
        setUserFeedback("Unsuccesful change");
        console.log("NOPE");
    };

    return (
        <div className="reset-password">
            {loading && <Spinner animation="border" variant="info" size="lg" />}

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label className="">Old Password</Form.Label>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Form.Control
                            className=""
                            type="password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label className="">New Password</Form.Label>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Form.Control
                            className=""
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                    </Col>
                </Form.Group>
                <Button onClick={savePassword}>Confirm</Button>
                <div>{userFeedback ?? <div>{userFeedback}</div>}</div>
            </Form>
        </div>
    );
};

export default PasswordChangeTab;
