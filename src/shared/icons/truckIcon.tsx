import React from "react";

const TruckIcon = ({ ...props }) => {
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
        <path d="m17 15h26c2.3 0 2.1 1.6 1.7 3.1s-3.7 14.9-3.7 14.9h10.1l4-2 3.9 2v8c0 1.3-.5 2-2 2h-8m-40 0h6.6m9.4 0h14.6"></path>
        <path d="m43.6 23h5.4l6.1 8m-24.1-8h-22m18 8h-22"></path>
        <path d="m24.8 44a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5zm24 0a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5z"></path>
      </g>
    </svg>
  );
};

export default TruckIcon;
