import React from 'react';
import AllUsers from './AllUsers';

export async function generateMetadata() {
  return {
    title: "All Users",
  };
}

const page = () => {
  return (
    <AllUsers/>
  );
};

export default page;