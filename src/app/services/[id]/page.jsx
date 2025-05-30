import React from 'react';
import SingleService from './SingleService';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = params; // Fixed: removed await

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/api/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch service data');
  }
  const data = await response.json();
  
  const serviceName = data.title;
  const serviceDescription = `Expert ${serviceName} at Car Doctor. Enhance your vehicle's performance with our specialized ${serviceName.toLowerCase()} service.`;

  return {
    title: `${serviceName}`,
    description: serviceDescription,
    keywords: [
      `${serviceName} service`,
      `${serviceName.toLowerCase()} repair`,
      "auto maintenance",
      "car diagnostics",
      "professional mechanics",
      "Car Doctor services"
    ],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: `${serviceName} - Car Doctor | Professional Service`,
      description: serviceDescription,
      images: [
        {
          url: `https://car-doctor.com/images/${serviceName.toLowerCase()}-service.jpg`, 
          width: 1200,
          height: 630,
          alt: `${serviceName} Service Image`,
        },
      ],
      url: `https://car-doctor.com/services/${id}`, 
      type: "website",
      site_name: "Car Doctor",
    },
  };
}

const page = async ({ params }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/api/${params.id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch service data');
  }
  const data = await response.json();
  
  return (
    <SingleService data={data} />
  );
};

export default page;
