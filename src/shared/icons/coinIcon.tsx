import React from "react";

const CoinIcon = ({ ...props }) => {
  return (
    <svg
      height="64"
      viewBox="0 0 64 64"
      width="64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        style={{
          fill: "none",
          stroke: "#202020",
          strokeMiterlimit: 10,
          strokeWidth: 2,
          strokeLinejoin: "round",
          strokeLinecap: "round",
        }}
      >
        <ellipse cx="42" cy="33" rx="12" ry="4"></ellipse>
        <path d="m54 41c0 2.2-5.4 4-12 4s-12-1.8-12-4m24 8c0 2.2-5.4 4-12 4s-12-1.8-12-4"></path>
        <path d="m30 39h-28v-36h60v36h-8"></path>
        <circle cx="32" cy="21" r="8"></circle>
        <path d="m12 21h4m32 0h4m-40-18a10 10 0 0 1 -10 10m60 0a10 10 0 0 1 -10-10m-50 26a10 10 0 0 1 10 10"></path>
        <path d="m30 33v24c0 2.2 5.4 4 12 4s12-1.8 12-4v-24"></path>
      </g>
    </svg>
  );
};

export default CoinIcon;
