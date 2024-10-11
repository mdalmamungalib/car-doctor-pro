import React from "react";

const HeadLayout = ({headTitle, title, description}) => {
  return (
    <div className="mb-10 space-y-5 text-center mx-auto max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[717px]">
      <h4 className="text-xl font-bold text-[#FF3811]">{headTitle}</h4>
      <h2 className="text-2xl font-bold sm:text-2xl md:text-3xl lg:text-4xl text-[#151515]">
        {title}
      </h2>
      <h6 className="text-xs sm:text-sm md:text-base lg:text-lg text-[#737373] text-center font-normal leading-[30px] capitalize">
        {description}
      </h6>
    </div>
  );
};

export default HeadLayout;
