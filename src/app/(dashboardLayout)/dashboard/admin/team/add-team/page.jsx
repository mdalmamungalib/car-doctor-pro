import React from 'react';
import AddTeam from './AddTeam';

export async function generateMetadata() {
  return {
    title: `Add Team Member`,
  };
}

const page = () => {
  return (
    <AddTeam/>
  );
};

export default page;