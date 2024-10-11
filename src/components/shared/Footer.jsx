import Image from "next/image";
import 'tailwindcss/tailwind.css'
import React from "react";
import { FaGoogle, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-100 bg-[#151515]">
      <div className="grid grid-cols-1 gap-8 px-6 py-16 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-4 sm:px-12 lg:px-16 xl:px-24">
        <aside className="flex flex-col space-y-5">
          <div>
            <div className="w-20 h-12">
              <Image
                width={74}
                height={40}
                src={"/assets/car.svg"}
                alt="logo"
              />
            </div>
            <h3 className="text-lg font-bold text-white">Car Doctor</h3>
          </div>
          <p className="text-sm text-[#E8E8E8]">
            Edwin Diaz is a software and web technologies engineer, a life coach trainer who is also a serial entrepreneur.
          </p>
          <div className="flex gap-3">
            {[
              FaGoogle,
              FaTwitter,
              FaInstagram,
              FaLinkedin,
            ].map((Icon, index) => (
              <div key={index} className="bg-[#2c2c2c] rounded-full p-3">
                <Icon size={20} />
              </div>
            ))}
          </div>
        </aside>
        <div className="flex justify-between sm:col-span-1 lg:col-span-3 lg:ml-[183px]">
          <nav>
            <h6 className="text-xl font-semibold text-white text-start">About</h6>
            <ul className="space-y-2 text-sm text-[#F3F3F3] mt-4">
              <li><a href="#">Home</a></li>
              <li><a href="#">Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <nav>
            <h6 className="text-xl font-semibold text-white text-start">Company</h6>
            <ul className="space-y-2 text-sm text-[#F3F3F3] mt-4">
              <li><a href="#">Why Car Doctor</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </nav>
          <nav>
            <h6 className="text-xl font-semibold text-white text-start">Support</h6>
            <ul className="space-y-2 text-sm text-[#F3F3F3] mt-4">
              <li><a href="#">Support Center</a></li>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
