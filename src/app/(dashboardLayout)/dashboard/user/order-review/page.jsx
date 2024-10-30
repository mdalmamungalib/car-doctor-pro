import React from "react";
import OrderReview from "./OrderReview";

export async function generateMetadata() {
  return {
    title: `Review`,
  };
}

const page = () => {
  return <OrderReview />;
};

export default page;
