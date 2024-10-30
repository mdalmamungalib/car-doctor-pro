import React from 'react';
import Team from './Team';

export async function generateMetadata() {
  return {
    title: `All Team Members`,
  };
}

const page = () => {
  return (
    <Team/>
  );
};

export default page;