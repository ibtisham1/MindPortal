import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";

const SmilePage = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const capturedRef = useRef(null);
    const imageResultRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);

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

    const analyse = (data) => {
        let toSend = convertToByteArr(data);
        let faceAttribs = "smile, emotion, age, gender";
        let params = {
            returnFaceId: "true",
            returnFaceLandmarks: "false",
            returnFaceAttributes: `${faceAttribs}`,
            faceIdTimeToLive: "86400",
            processData: false,
        };

        // store this in the backend and retrieve for security.
        let key = "6e4ccc74ec694dce89968a7db92f9660";
        const headers = {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": `${key}`,
        };

        let url =
            "https://mindportal.cognitiveservices.azure.com/face/v1.0/detect";

        let imageUrl =
            "https://en.wikipedia.org/wiki/Face#/media/File:Kulusuk,_Inuit_man_(6822268117).jpg";

        axios
            .post(url, toSend, { headers: headers, params: params })
            .then((result) => {
                // console.log(result);
                console.log(result.data[0]);
                let imgResult = result.data[0];
                let str = JSON.stringify(imgResult);
                let txt = document.createElement("p");
                txt.innerHTML = `${str}`;
                imageResultRef.current.appendChild(txt);
            })
            .catch((err) => {
                console.log(err);
            });
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
                video.play();
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
                video.play();
                setIsStreaming(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <h1>Smile challenge</h1>
                </Row>
                <Row>
                    <Col>
                        <p>
                            Studies show that even fake smiles can release
                            chemicals to help you feel happier.{" "}
                        </p>
                        <p>
                            Press Take a photo and convince the smile box for a
                            daily happiness booster
                        </p>
                    </Col>
                </Row>

                <Row>
                    {isStreaming ? (
                        <>
                            <button onClick={() => stop()}>Stop camera</button>
                            <button onClick={() => takePhoto()}>
                                Take a photo
                            </button>
                        </>
                    ) : (
                        <button onClick={() => start()}>Start Camera</button>
                    )}
                </Row>
                <Row className="justify-content-center">
                    <Col sm={3}>
                        <video
                            ref={videoRef}
                            onCanPlay={() => paintToCanvas()}
                        />
                    </Col>
                </Row>
                <Row>
                    <div ref={capturedRef}>
                        {/* <div ref={captureRef}></div> */}
                    </div>
                </Row>
                <Row>
                    <div ref={imageResultRef}></div>
                </Row>
            </Container>

            <canvas hidden ref={photoRef} />
        </>
    );
};

export default SmilePage;
