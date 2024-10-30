"use client"; 
import Footer from "components/shared/Footer";
import Navbar from "components/shared/Navbar";
import React from "react";
import { usePathname } from "next/navigation";
export const dynamic = "force-dynamic";

const HomeLayout = ({ children }) => {
  const pathname = usePathname(); 

  const hiddenRoutes = ["/404", "/not-found", "/login", "/signup"];
  const isHidden = hiddenRoutes.includes(pathname); 

  return (
    <>
      {!isHidden && <Navbar />}
      <div className="min-h-screen max-w-[1140px] mx-auto p-5 lg:px-0 overflow-hidden">
        {children}
      </div>
      {!isHidden && <Footer />}
    </>
  );
};

export default HomeLayout;
