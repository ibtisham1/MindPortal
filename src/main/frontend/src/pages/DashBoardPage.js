import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";
// import AuthButton from "../components/AuthButton";
import "../styles/Login.scss";
import {
    Row,
    Container,
    Button,
    Col,
    Form,
    Card,
    CardGroup,
} from "react-bootstrap";
import Header from "../components/Header";
import axios from "axios";
import "../styles/DashBoard.scss";

const DashBoardPage = () => {
    let location = useLocation();
    const auth = useAuth();
    const user = auth.user;

    let { from } = location.state || { from: { pathname: "/" } };

    const baseURL =
        "https://data.nsw.gov.au/data/dataset/0a52e6c1-bc0b-48af-8b45-d791a6d8e289/resource/f3a28eed-8c2a-437b-8ac1-2dab3cf760f9/download/covid-case-locations-20210717-1753.json";
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    React.useEffect(() => {
        setLoading(true);
        axios
            .get(baseURL)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    // if (!post) return null;

    // const monitorData = post.data.monitor;
    // console.log(monitorData);

    /**
     *
     * renders a single covid info card given an index to the data.
     *
     * @param {*} index within post data
     * @returns card
     */
    const renderCovidInfoCard = (index) => {
        return (
            <Card style={{ borderRadius: 10, marginTop: 5 }}>
                <Card.Body>
                    <Card.Title style={{ color: "rgba(242,109,113,1)" ,textAlign: "center" }} className="mindPortalAlert">
                        New Covid Venue Alert!
                    </Card.Title>
                    <p style={{ marginBottom: 0 }}>
                        <span style={{ fontWeight: "bold" }}>Venue:</span>{" "}
                        {JSON.stringify(post.data.monitor[index].Venue)}
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        <span style={{ fontWeight: "bold" }}>Address</span>{" "}
                        {JSON.stringify(post.data.monitor[index].Address)}
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        <span style={{ fontWeight: "bold" }}>Suburb:</span>{" "}
                        {JSON.stringify(post.data.monitor[index].Suburb)}
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        <span style={{ fontWeight: "bold" }}>Alert:</span>{" "}
                        {JSON.stringify(post.data.monitor[index].Alert)}
                    </p>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Container fluid className="Dashboard p-0">
            <Header />
            {loading || post == null ? (
                "loading"
            ) : (
                <Row className="m-0">
                    <Col lg={9} className="Dashboard__main">
                        <Container fluid>
                            <h1 className="Dashboard__main__title mt-3">
                                Welcome {user.firstName},
                            </h1>

                            {/*<p className="Dashboard__main__description">*/}
                            {/*    This is your MindPortal dashboard.*/}
                            {/*</p>*/}
                            <p
                                className="Dashboard__main__description"
                                style={{ marginTop: 0 }}
                            >
                                Take a step towards better mental health by
                                taking a daily confidential K-10 test.
                            </p>
                            {/* <p
                                className="Dashboard__main__description"
                                style={{ margin: 0 }}
                            >
                                The K-10 test is essential for for us to assist
                                you.
                            </p> */}

                            {/* <h4 style={{ color: "red" }}>
                                (Note: It is essential for you to have done at
                                least one K-10 test! Please take one if you have
                                not.)
                            </h4> */}
                            <h4 className="Dashboard__main__heading">Tests</h4>

                            <Row>
                                <Col sm={6}>
                                    {" "}
                                    <Card
                                        className="Dashboard__main__card pt-2"
                                        style={{
                                            margin: 5,
                                            borderRadius: 10,
                                            boxShadow:
                                                "1px 1px 2px 0.2px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        <Card.Body>
                                            <Card.Title>
                                                Mental Health Test
                                            </Card.Title>

                                            <Card.Text>
                                                Click 'Take Test' to initiate
                                                the K-10 mental health test
                                            </Card.Text>

                                            {/* <Link
                                        to="/testOptions"
                                        className="btn btn-primary"
                                    >
                                        Take Test
                                    </Link> */}
                                        </Card.Body>
                                        <Card.Footer
                                            style={{ textAlign: "center" }}
                                        >
                                            <Link to="/testOptions">
                                                <button className="mindPortalButton primary">
                                                    Take Test
                                                </button>
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>

                            <h4 className="Dashboard__main__heading">
                                Suggested Actions
                            </h4>

                            <CardGroup>
                                <Card
                                    style={{
                                        margin: 5,
                                        borderRadius: 10,
                                        boxShadow:
                                            "1px 1px 2px 0.2px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>
                                            Moments To Appreciate
                                        </Card.Title>

                                        <Card.Text>
                                            Videos of cute animals to brighten
                                            up your day!
                                        </Card.Text>

                                        {/* <button className="mindPortalButton primary">
                                            Go
                                        </button> */}
                                    </Card.Body>
                                    <Card.Footer
                                        style={{ textAlign: "center" }}
                                    >
                                        <button className="mindPortalButton primary">
                                            Go
                                        </button>
                                    </Card.Footer>
                                </Card>
                                <Card
                                    style={{
                                        margin: 5,
                                        borderRadius: 10,
                                        boxShadow:
                                            "1px 1px 2px 0.2px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>
                                            Mindfulness Space
                                        </Card.Title>

                                        <Card.Text>
                                            Scientifically researched binaural
                                            beats with Alpha wave to relax
                                            yourself, better result when used
                                            with earphones!
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer
                                        style={{ textAlign: "center" }}
                                    >
                                        <button className="mindPortalButton primary">
                                            Go
                                        </button>
                                    </Card.Footer>
                                </Card>
                            </CardGroup>
                        </Container>
                    </Col>
                    <Col lg={3} className="Dashboard__sidebar">
                        {post != null && (
                            <>
                                {renderCovidInfoCard(50)}
                                {renderCovidInfoCard(80)}
                                {renderCovidInfoCard(120)}
                                {renderCovidInfoCard(150)}
                                {/*{renderCovidInfoCard(180)}*/}
                            </>
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default DashBoardPage;
