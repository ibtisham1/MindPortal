import React from "react";

const CheckMarkSVG = () => {
    return (
        <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
        >
            <circle class="circle" cx="20" cy="20" r="20" fill="#0c3" />
            <path
                class="check"
                d="M13 20l5 5 9-9"
                fill="none"
                stroke="#fff"
                stroke-width="2.5"
                stroke-linecap="round"
            ></path>
        </svg>
    );
};

export default CheckMarkSVG;
