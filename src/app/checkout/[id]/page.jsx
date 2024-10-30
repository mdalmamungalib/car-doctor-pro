import React from 'react';
import Checkout from './Checkout';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
 
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/api/${params?.id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch checkout data');
  }
  
  const data = await response.json();
  
  const items = data.title || [];
  const totalPrice = data.price || 0; 
  
  return {
    title: `Checkout - ${items}`,
    description: `Complete your purchase of ${items} for a total of $${totalPrice}. Enjoy a smooth and secure checkout experience at Your Store Name.`,
    keywords: [
      "checkout",
      "shopping cart",
      "online payment",
      "purchase",
      "secure checkout",
      "Your Store Name",
    ],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: `Checkout - ${items}`,
      description: `Purchase ${items} for $${totalPrice}. Secure checkout at Your Store Name.`,
      images: [
        {
          url: `https://yourwebsite.com/images/checkout-image.jpg`, 
          width: 1200,
          height: 630,
          alt: `Checkout Image`,
        },
      ],
      url: `https://yourwebsite.com/checkout/${params?.id}`, 
      type: "website",
      site_name: "Your Store Name",
    },
  };
}


const page = async({params}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/api/${params?.id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch service data');
  }
  const data = await response.json();
  
  return (
    <Checkout data={data}/>
  );
};

export default page;