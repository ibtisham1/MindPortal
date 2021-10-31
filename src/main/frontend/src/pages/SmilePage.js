import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import "../styles/Smile.scss";
import axiosConfig from "../services/axiosConfig";
import useAuth from "../services/useAuth";
const SmilePage = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const capturedRef = useRef(null);
    const imageResultRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageResult, setImageResult] = useState("Press take a photo");

    // get auth context
    const auth = useAuth();
    const { getSmileResult } = auth;

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    // paints video stream to hidden canvas for image
    const paintToCanvas = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        const width = 320;
        const height = 240;
        photo.width = width;
        photo.height = height;

        return setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height);
        }, 200);
    };

    const takePhoto = () => {
        setIsLoading(true);
        let photo = photoRef.current;
        let captured = capturedRef.current;

        const data = photo.toDataURL("image/jpeg");

        const oldDiv = document.getElementById("captured-photo");

        console.warn(data);
        // new
        const div = document.createElement("div");
        div.setAttribute("id", "captured-photo");
        const link = document.createElement("a");
        link.href = data;
        link.setAttribute("download", "myWebcam");
        link.innerHTML = `<img src='${data}' alt='thumbnal'/> `;
        div.appendChild(link);

        if (oldDiv == null) {
            captured.appendChild(div);
        } else {
            captured.replaceChild(div, oldDiv);
        }

        // upload image to face api and do analysis
        analyse(data);
    };

    const convertToByteArr = (data) => {
        // var dataUri = canvas.toDataURL('image/' + format);
        let dataUri = data;
        var data = dataUri.split(",")[1];
        var mimeType = dataUri.split(";")[0].slice(5);

        var bytes = window.atob(data);
        var buf = new ArrayBuffer(bytes.length);
        var byteArr = new Uint8Array(buf);

        for (var i = 0; i < bytes.length; i++) {
            byteArr[i] = bytes.charCodeAt(i);
        }

        return byteArr;
    };

    const onImageResult = (smileValue) => {
        // set loading false;
        setIsLoading(false);

        let str;

        if (smileValue === undefined) {
            str = "please try again";
        } else {
            // let smileValue = Number(imgResult.faceAttributes.smile);
            console.log("smile value: " + smileValue);

            if (smileValue < 0.85 && smileValue >= 0.5) {
                str = "Almost there, little more smile";
            }

            if (smileValue < 0.5) {
                // more smile
                str = "more smile!";
            }

            if (smileValue >= 0.85) {
                // passed
                str = `Congratulations, smile score: ${(
                    smileValue * 100
                ).toFixed(2)}`;
                // refresh user
            }
        }
        setImageResult(str);
    };

    const analyse = (data) => {
        let toSend = convertToByteArr(data);

        getSmileResult(toSend, onImageResult);
    };

    const stop = (e) => {
        let video = videoRef.current;
        const stream = video.srcObject;
        // const tracks = stream.getTracks();

        stream.getTracks().forEach((track) => {
            track.stop();
        });

        video.srcObject = null;
        setIsStreaming(false);

        const image = document.getElementById("captured-photo");
        if (image != null) {
            capturedRef.current.removeChild(image);
        }
    };

    const start = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play().catch((e) => {
                    console.log(e);
                });
                setIsStreaming(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play().catch((e) => {
                    console.log(e);
                });
                setIsStreaming(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header />
            <Container fluid className="smile__container px-0">
                <Container className="px-5">
                    <Row>
                        <h1 className="smile__title">Smile challenge</h1>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={8}>
                            <div className="smile__description">
                                Studies show that even fake smiles can release
                                chemicals to help you feel happier.
                            </div>
                            <div className="smile__description">
                                Take a photo and convince the smile cam for a
                                daily happiness boost.
                            </div>
                        </Col>
                        {/* <Col>
                        <p className="smile__description">
                            Take a photo and convince the smile cam for a daily
                            happiness boost.
                        </p>
                    </Col> */}
                    </Row>
                </Container>

                <Container className="smile px-5">
                    <Row className="justify-content-center">
                        <Col sm={8}>
                            <Row className="mb-3">
                                <Col sm={8}>
                                    <video
                                        className="smile__video"
                                        ref={videoRef}
                                        onCanPlay={() => paintToCanvas()}
                                    />
                                </Col>{" "}
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <div className="smile__captured">
                                <div ref={capturedRef}></div>
                                <div className="smile__result">
                                    {isLoading ? (
                                        <Spinner animation="border" />
                                    ) : (
                                        imageResult
                                    )}
                                </div>
                                {/* <div
                                    className="smile__result"
                                    ref={imageResultRef}
                                >
                                    <div id="image-result">
                                        Press take a photo
                                    </div>
                                </div> */}
                            </div>

                            <Row></Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="smile__controls">
                                {isStreaming ? (
                                    <>
                                        <button
                                            size="sm"
                                            className="mindPortalButton secondary"
                                            onClick={() => takePhoto()}
                                        >
                                            Take a photo
                                        </button>
                                        <button
                                            size="sm"
                                            className="mindPortalButton secondary"
                                            onClick={() => stop()}
                                        >
                                            Stop camera
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        size="sm"
                                        className="mindPortalButton secondary"
                                        onClick={() => start()}
                                    >
                                        Start Camera
                                    </button>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row></Row>
                </Container>
            </Container>

            <canvas hidden ref={photoRef} />
        </>
    );
};

export default SmilePage;
