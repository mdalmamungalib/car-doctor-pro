import React from 'react';
import UpdateMember from './UpdateMember';

export const dynamic = "force-dynamic";

export async function generateMetadata() {


  return {
    title: `Update Time Member`,
  };
}

const page = ({params}) => {
  return (
   <UpdateMember  id={params.id} />

  );
};

export default page;