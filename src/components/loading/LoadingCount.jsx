import React from "react";

const LoadingCount = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1rem",
        fontWeight: "normal",
      }}
    >
      Please wait
      <span className="dot-animation"></span>
      <style>
        {`
           @keyframes dots {
            0% {
              content: '...';
            }
            33% {
              content: '.';
            }
            66% {
              content: '..';
            }
              100%{
              content: '...';}
          }


          .dot-animation::after {
            content: '';
            animation: dots 1s steps(3, end) infinite;
            display: inline-block;
            width: 1rem;
            text-align: left;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingCount;
