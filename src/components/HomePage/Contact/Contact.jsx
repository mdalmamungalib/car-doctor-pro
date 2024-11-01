import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

const Contact = () => {
  const details = [
    {
      title: "We are open monday-friday",
      description: "7:00 am - 9:00 pm",
      icon: "/assets/icons/time.svg",
    },
    {
      title: "Have a question?",
      description: "+2546 251 2658",
      icon: "/assets/icons/phone.svg",
    },
    {
      title: "Need a repair? our address",
      description: "Liza Street, New York",
      icon: "/assets/icons/location.svg",
    },
  ];
  return (
    <div className="bg-[#151515] rounded-lg px-[72px] py-[96px] text-white 
    flex flex-col lg:flex-row justify-between items-center gap-6 
    lg:gap-12 mt-12 lg:mt-24" data-aos="zoom-in-up">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center gap-4 lg:gap-6">
          <div>
            <Image
              src={detail.icon}
              width={40}
              height={40}
              alt="svg"
              className="w-10 h-10"
            />
          </div>
          <div className="pl-[20px]">
            <p className="text-base font-medium">{detail.title}</p>{" "}
            <h3 className=" font-bold text-[23px]">
              {detail.description}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
