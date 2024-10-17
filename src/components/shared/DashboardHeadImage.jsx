import React from 'react';

const DashboardHeadImage = ({title, subTile}) => {
    return (
        <div
        className="w-full min-h-[210px] sm:min-h-[300px] rounded-[10px] bg-cover bg-no-repeat bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #151515 0%, rgba(21, 21, 21, 0.00) 100%), url('/assets/images/checkout/checkout.png')",
        }}
      >
        <div className="absolute left-0 pl-4 sm:pl-8 md:pl-12 lg:pl-[124px] xl:pl-[124px]">
          <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl font-inter">
            {title}
          </h1>
          <p className="text-base font-medium text-[#FF3811] mt-2">
            Dashboard - {subTile}
          </p>
        </div>
      </div>
    );
};

export default DashboardHeadImage;