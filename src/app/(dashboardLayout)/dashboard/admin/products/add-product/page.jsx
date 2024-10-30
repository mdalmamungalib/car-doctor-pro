import React from 'react';
import AddProduct from './AddProduct';

export async function generateMetadata() {
  return {
    title: `Add Product`,
  };
}

const page = () => {
  return (
    <AddProduct/>
  );
};

export default page;