import React from 'react';
import UpdateProduct from './UpdateProduct';

export async function generateMetadata() {
  return {
    title: `Update Product`,
  };
}

const page = ({params}) => {
  return (
    <UpdateProduct id={params?.id}/>
  );
};

export default page;