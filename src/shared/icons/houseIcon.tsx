import React from "react";

const HouseIcon = ({ ...props }) => {
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
        <path d="m36 36h12v22h-12z"></path>
        <path d="m56 30v28h-48v-28"></path>
        <path d="m16 36h14v12h-14z"></path>
        <path d="m52.6 6h-41.2l-9.4 16.5a7.5 7.5 0 0 0 15 0 7.5 7.5 0 0 0 15 0 7.5 7.5 0 0 0 15 0 7.5 7.5 0 0 0 15 0zm-50.6 16h60m-30-16v16.5m-15 0 5-16.5m25 16.5-5-16.5"></path>
      </g>
    </svg>
  );
};

export default HouseIcon;
