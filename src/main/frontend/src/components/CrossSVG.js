import React from "react";

const CrossSVG = () => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="20" cy="20" r="20" fill="#F36363" />
            <line
                x1="12.5308"
                y1="10.1821"
                x2="27.7066"
                y2="27.0079"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
            />
            <line
                x1="27.8666"
                y1="10.5324"
                x2="12.5324"
                y2="27.2141"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
            />
        </svg>
    );
};

export default CrossSVG;
