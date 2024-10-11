import HeadLayout from "components/shared/HeadLayout";
import Image from "next/image";
import React from "react";

const Features = () => {
  const features = [
    { title: "Expert Team", icon: "/assets/icons/group.svg" },
    { title: "Timely Delivery", icon: "/assets/icons/time1.svg" },
    { title: "24/7 Support", icon: "/assets/icons/person.svg" },
    { title: "Best Equipment", icon: "/assets/icons/Wrench.svg" },
    { title: "100% Guranty", icon: "/assets/icons/check.svg" },
    {
      title: "Timely Delivery",
      icon: "/assets/icons/deliveryt.svg",
    },
  ];
  return (
    <div className="mt-[132px] px-4">
      <HeadLayout
        headTitle="Core Features"
        title="Why Choose Us"
        description="The majority have suffered alteration in some form, by
          injected humour, or randomised words which don't look even
          slightly believable."
      />

      <div className="mt-[50px] grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center border border-[#E8E8E8] rounded-[10px] 
      w-[170px] h-[156px] bg-white hover:bg-[#FF3811] group"
          >
            <Image
              src={feature?.icon}
              alt="Group Icon"
              width={76}
              height={53}
              className="w-[76px] h-[55px] group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:white"
            />

            <h2 className="text-[#444444] text-[18px] font-bold mt-5 group-hover:text-white">
              {feature?.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
