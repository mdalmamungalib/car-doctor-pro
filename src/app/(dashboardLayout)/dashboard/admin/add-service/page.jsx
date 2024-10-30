import React from 'react';
import AddService from './AddService';

export async function generateMetadata() {
  return {
    title: `Add Service`,
  };
}

const page = () => {
  return (
    <AddService/>
  );
};

export default page;