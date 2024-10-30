import React from "react";
import Services from "./services";

export async function generateMetadata() {
  return {
    title: "Services",
  };
}

const page = () => {
  return <Services />;
};

export default page;
