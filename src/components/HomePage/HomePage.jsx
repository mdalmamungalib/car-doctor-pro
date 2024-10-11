import React from "react";
import "tailwindcss/tailwind.css";
import Banner from "./Banner/Banner";
import AboutUs from "./AboutUs/AboutUs";
import Services from "./Services/Services";
import Contact from "./Contact/Contact";
import Products from "./Products/Products";
import Team from "./Team/Team";
import Features from "./Features/Features";
import Testimonial from "./Testimonial/Testimonial";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Services />
      <Contact />
      <Products />
      <Team />
      <Features />
      <Testimonial />
    </div>
  );
};

export default HomePage;
