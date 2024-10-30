import React from 'react';
import Products from './Products';

export async function generateMetadata() {
  return {
    title: `All Products`,
  };
}

const page = () => {
  return (
    <Products/>
  );
};

export default page;