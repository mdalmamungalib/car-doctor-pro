import React from 'react';
import MyBooking from './MyBooking';

export async function generateMetadata() {
  return {
    title: `Booking`,
  };
}

const page = async () => {
  return (
    <MyBooking/>
  );
};

export default page;