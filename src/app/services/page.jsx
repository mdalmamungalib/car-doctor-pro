import React from 'react';
import Services from './services';

export async function generateMetadata() {
  return {
    title: "Services",
    description: "Explore Car Doctor's range of professional car repair and maintenance services. From diagnostics to tune-ups, ensure your vehicle runs smoothly.",
    keywords: [
      "car repair services",
      "auto maintenance",
      "vehicle diagnostics",
      "engine tune-ups",
      "professional mechanics",
      "Car Doctor services"
    ],
    icons: {
      icon: "/favicon.ico", // Path to favicon in the public directory
    },
    openGraph: {
      title: "Services - Car Doctor | Professional Car Repair & Maintenance",
      description: "Discover a wide range of services offered by Car Doctor, your trusted partner in car repair and maintenance. Keep your vehicle in top shape with our expert solutions.",
      images: [
        {
          url: "https://yourwebsite.com/images/services-header.jpg", // Replace with an appropriate services-related image
          width: 1200,
          height: 630,
          alt: "Car Doctor Services Header Image",
        },
      ],
      url: "https://yourwebsite.com/services", // Replace with your actual services page URL
      type: "website",
      site_name: "Car Doctor",
    },
  };
}


const page = () => {
  return (
    <Services/>
  );
};

export default page;