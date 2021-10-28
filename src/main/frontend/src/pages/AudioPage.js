import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import {Col, Container, Row, Card, Button, OverlayTrigger ,Tooltip} from "react-bootstrap";
import "../styles/Audio.scss";
import ResultDiagnosis from "../services/resultDiagnosis";


const AudioPage = () => {
    let resultDiagnosis= ResultDiagnosis();
    let answer = resultDiagnosis.getDiagnosis();

    const [index, setIndex] = useState(0);


   useEffect(() => {
      Play(1);
      SetCardText();
   });

   function SetCardText(){
       var card1Title = document.getElementById("card1Title");
       var card2Title = document.getElementById("card2Title");
       var card3Title = document.getElementById("card3Title");
       var card1Text = document.getElementById("card1Text");
       var card2Text = document.getElementById("card2Text");
       var card3Text = document.getElementById("card3Text");

       switch(answer){
           case "well":
               card1Title.textContent = "River Nature Sounds";
               card2Title.textContent = "Soothing Rain Sounds";
               card3Title.textContent = "Rainforest Waterfall Sound";
               card1Text.textContent = "Enjoy the natural sound of water flowing through a river";
               card2Text.textContent = "Enjoy the soothing sound of rain pouring down";
               card3Text.textContent = "Enjoy the sound of a waterfall deep in a rainforest";
               break;
           case "mild":
               card1Title.textContent = "Alpha Binaural Beats";
               card2Title.textContent = "Alpha Binaural Beats";
               card3Title.textContent = "Alpha Binaural Beats";
               card1Text.textContent = "Enjoy the first track of these soothing alpha-wave binaural beats~";
               card2Text.textContent = "Enjoy the second track of these soothing alpha-wave binaural beats~";
               card3Text.textContent = "Enjoy the third track of these soothing alpha-wave binaural beats~";
               break;
           case "moderate":
               card1Title.textContent = "Delta Binaural beats";
               card2Title.textContent = "Delta Binaural beats";
               card3Title.textContent = "Delta Binaural beats";
               card1Text.textContent = "Enjoy the first track of these relaxing delta-wave binaural beats~";
               card2Text.textContent = "Enjoy the second track of these relaxing delta-wave binaural beats~";
               card3Text.textContent = "Enjoy the third track of these relaxing delta-wave binaural beats~";
               break;
           case "severe":
               card1Title.textContent = "Happiness inducing music";
               card2Title.textContent = "Theta Ocean Waves";
               card3Title.textContent = "Positive Energy Binaural beats";
               card1Text.textContent = "Enjoy a happiness hit, with a dopamine inducing track at 396hz";
               card2Text.textContent = "Enjoy the sound of ocean waves, mixed in with theta waves";
               card3Text.textContent = "Enjoy the sound of positivity inducing binaural beats";
               break;
           default:
               break;
       }
   }

    function Pause(){
        var audioPlayer = document.getElementById("music");
        audioPlayer.pause();
        var card1 = document.getElementById("card1");
        switch(answer){
            case "well":
                card1.src = "https://i.imgur.com/Frp7vvI.jpg";
                break;
            case "mild":
                card1.src = "https://i.imgur.com/r6Vf89M.jpg";
                break;
            case "moderate":
                card1.src = "https://i.imgur.com/IBoNQvR.jpg";
                break;
            case "severe":
                card1.src = "https://i.imgur.com/YHks6YU.jpg";
                break;
            default:
                card1.src = "https://i.imgur.com/Frp7vvI.jpg";
                break;
        }
        var card2 = document.getElementById("card2");
        switch(answer){
            case "well":
                card2.src = "https://i.imgur.com/7atDpKE.jpg";
                break;
            case "mild":
                card2.src = "https://i.i.imgur.com/F1yv054.jpg";
                break;
            case "moderate":
                card2.src = "https://i.imgur.com/ey4Tmj6.jpg";
                break;
            case "severe":
                card2.src = "https://i.imgur.com/wp3rnns.jpg";
                break;
            default:
                card2.src = "https://i.imgur.com/F1yv054.jpg";
                break;
        }

        var card3 = document.getElementById("card3");
        switch(answer){
            case "well":
                card3.src = "https://i.imgur.com/JQRMCFF.jpg";
                break;
            case "mild":
                card3.src = "https://i.imgur.com/JVXx5U5.jpg";
                break;
            case "moderate":
                card3.src = "https://i.imgur.com/4SdHWtW.jpg";
                break;
            case "severe":
                card3.src = "https://i.imgur.com/1g8q9K6.jpg";
                break;
            default:
                card3.src = "https://i.imgur.com/aM7ujRv.jpg";
                break;
        }

    }

    function Play(num){
        var audioPlayer = document.getElementById("music");
        var card1 = document.getElementById("card1");
        var card2 = document.getElementById("card2");
        var card3 = document.getElementById("card3");

       Pause();
        switch (num) {
            case 1:
                switch(answer){
                    case "well":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2018/02/Blue-River-Nature-Sounds.mp3";
                        card1.src = "https://i.imgur.com/d0EfsaT.gif";
                        break;
                    case "mild":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3";
                        card1.src = "https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif";
                        break;
                    case "moderate":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Lucid-Dreams-Music-with-Delta-brainwaves-for-Sleep-no-1-45-min.mp3";
                        card1.src = "https://i.imgur.com/NJa2qMN.gif";
                        break;
                    case "severe":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/12/Happiness-Frequency-396hz-Boost-Dopamin-Release.mp3";
                        card1.src = "https://i.imgur.com/YRNBSuh.gif";
                        break;
                    default:
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Deep-Sleep-Music-Calming-River-45-min.mp3";
                        card1.src = "https://i.imgur.com/d0EfsaT.gif";
                        break;
                }
                break;
            case 2:
                switch(answer){
                    case "well":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Relaxing-Nature-Sounds-Soothing-Rain-50-min-no-music.mp3";
                        card2.src = "https://i.imgur.com/Sk8uISa.gif";
                        break;
                    case "mild":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwavesno-2-37-min.mp3";
                        card2.src = "https://i.imgur.com/1QYu9wS.gif";
                        break;
                    case "moderate":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Lucid-Dreams-Music-with-Delta-brainwaves-for-Sleep-no-2-37-min.mp3";
                        card2.src = "https://i.imgur.com/upaf5C3.gif";
                        break;
                    case "severe":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/12/Celectial-Ocean-Stress-Relief-Music-with-Theta-Waves.mp3";
                        card2.src = "https://i.imgur.com/JyhqFCp.gif";
                        break;
                    default:
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Deep-Sleep-Music-Gentle-Rain-45-min.mp3";
                        card2.src = "https://i.imgur.com/1QYu9wS.gif";
                        break;
                }
                break;
            case 3:
                switch(answer){
                    case "well":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Relaxing-Nature-Sounds-Rainforest-Waterfall-50-min-no-music.mp3";
                        card3.src = "https://i.imgur.com/W8wosSJ.gif";
                        break;
                    case "mild":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-3-45-min.mp3";
                        card3.src = "https://i.imgur.com/WBM6Mzr.gif";
                        break;
                    case "moderate":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Lucid-Dreams-Music-with-Delta-brainwaves-for-Sleep-no-1-45-min.mp3";
                        card3.src = "https://i.imgur.com/MlfDS2G.gif";
                        break;
                    case "severe":
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Positive-Energy-Music-Therapy-with-Binaural-Beats-for-Wellbeing-no-1-45-min.mp3";
                        card3.src = "https://i.imgur.com/Znc3TJQ.gif";
                        break;
                    default:
                        audioPlayer.src = "https://music2relax.com/wp-content/uploads/2017/04/Deep-Sleep-Music-Soft-Ocean-Waves-50min.mp3";
                        card3.src = "https://i.imgur.com/gmuhE5e.gif";
                        break;
                }
                break;
        }
        //Pause();
        //Play(1);
        audioPlayer.play();
        console.log(num);
    }


    return (
        <div>
            <Header />
            <Container fluid className="Audio page">

                <audio id="music" preload="true" autoPlay="true">
                    <source src="https://music2relax.com/wp-content/uploads/2017/04/Music-for-Study-focus-better-with-alfa-brainwaves-no-1-45-min.mp3" type="audio/mpeg" />
                </audio>
                <Row>
                    <OverlayTrigger overlay={<Tooltip id="tooltip">Press the buttons below to change tracks!</Tooltip>} placement="bottom">
                        <h2>Relax along with some soothing music~</h2>
                    </OverlayTrigger>
                </Row>
                <p></p>
                <Row>
                    <Col className="Audio result">
                        <Card className="Audio card border border-2">
                            <Card.Img id="card1" variant="top" src="https://i.pinimg.com/originals/4f/c9/81/4fc981a8d2c3d6eead0c3dfc27b5904a.gif" className="Audio gif"/>
                            <Card.Body>
                                <Card.Title id="card1Title">
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text id="card1Text">
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <Button variant="dark" className="Audio button" size="lg" onClick={() => Play(1)}>Play</Button>
                                <Button variant="dark" className="Audio button" size="lg" onClick={Pause}>Pause</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="Audio result">
                        <Card className="Audio card border border-2">
                            <Card.Img id="card2" variant="top" src="https://i.imgur.com/F1yv054.jpg" className="Audio gif"/>
                            <Card.Body>
                                <Card.Title id="card2Title">
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text id="card2Text">
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <Button variant="dark" className="Audio button" size="lg" onClick={() => Play(2)}>Play</Button>
                                <Button variant="dark" className="Audio button" size="lg" onClick={Pause}>Pause</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="Audio result">
                        <Card className="Audio card border border-2">
                            <Card.Img id="card3" variant="top" src="https://i.imgur.com/7atDpKE.jpg" className="Audio gif"/>
                            <Card.Body>
                                <Card.Title id="card3Title">
                                    Alpha Wave Binaural Beats
                                </Card.Title>
                                <Card.Text id="card3Text">
                                    Relax along with some binaural beats~
                                </Card.Text>
                                <Button variant="dark" className="Audio button" size="lg" onClick={() => Play(3)}>Play</Button>
                                <Button variant="dark" className="Audio button" size="lg" onClick={Pause}>Pause</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AudioPage;
