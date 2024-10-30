import React from "react";
import ABooking from "./ABooking";

export async function generateMetadata() {
  return {
    title: `Booking Details`,
  };
}

const Page = async ({ params }) => {
  return <ABooking id={params.id} />;
};

export default Page;
