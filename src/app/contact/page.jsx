import ContactPage from "./ContactPage";

// src/app/contact/metadata.js
export async function generateMetadata() {
  return {
    title: "Contact Us",
    description: "Get in touch with the Car Doctor team for expert advice on car repair and maintenance. We're here to assist you with all your automotive needs.",
    keywords: [
      "contact car repair",
      "car maintenance support",
      "automotive inquiries",
      "Car Doctor contact",
      "vehicle care questions",
      "professional mechanics support"
    ],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: "Contact Us - Car Doctor | Expert Insights on Car Repair and Maintenance",
      description: "Reach out to Car Doctor for expert tips, guidance, and answers to your car repair questions. We're dedicated to enhancing your vehicle's performance.",
      images: [
        {
          url: "https://yourwebsite.com/images/Contact-header.jpg",
          width: 1200,
          height: 630,
          alt: "Contact Us - Car Doctor",
        },
      ],
      url: "https://yourwebsite.com/contact",
      type: "website",
      site_name: "Car Doctor",
    },
  };
}


const page = () => {
  return <ContactPage />;
};

export default page;
