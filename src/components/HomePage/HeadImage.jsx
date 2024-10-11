import React from "react";

const HeadImage = ({title, subtitle}) => {
  return (
    <div
      className="w-full min-h-[210px] sm:min-h-[300px] rounded-[10px] bg-cover bg-no-repeat bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #151515 0%, rgba(21, 21, 21, 0.00) 100%), url('/assets/images/checkout/checkout.png')",
      }}
    >
      <div className="absolute left-0 pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-12">
        <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl font-inter">
          {title}
        </h1>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 296 50"
          className="w-full h-auto"
          style={{
            width: "296px",
            height: "49.3px",
            fill: "#FF3811",
          }}
        >
          <path d="M296 49.3H0L27.8 0H268.3L296 49.3Z" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#FFF"
            fontSize="16"
            fontFamily="Inter"
            fontWeight="500"
          >
            Home/{subtitle}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default HeadImage;
