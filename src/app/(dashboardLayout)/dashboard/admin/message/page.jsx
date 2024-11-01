import React from 'react';
import Message from './Message';

export async function generateMetadata() {
    return {
      title: "Messages",
    };
  }

const page = () => {
    
    return (
        <Message/>
    );
};

export default page;