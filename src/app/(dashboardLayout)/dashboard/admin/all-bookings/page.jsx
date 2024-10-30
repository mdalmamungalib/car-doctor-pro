import React from 'react';
import AllBooking from './AllBooking';

export async function generateMetadata() {
  return {
    title: "All Bookings",
  };
}

const page = () => {
  return (
    <AllBooking/>
  );
};

export default page;