import React from "react";
import SignUp from "./SignUp";

export async function generateMetadata() {
    return {
      title: "Sign Up",
      description: "Join Car Doctor today! Create an account to access personalized features, exclusive content, and stay updated with the latest news.",
      keywords: [
        "sign up",
        "register",
        "create account",
        "join",
        "user registration",
        "Car Doctor",
        "exclusive content",
        "personalized features"
      ],
      icons: {
        icon: "/favicon.ico",
      },
      openGraph: {
        title: "Sign Up for Car Doctor",
        description: "Create an account to unlock exclusive content and personalized features on Car Doctor.",
        images: [
          {
            url: "https://yourwebsite.com/images/signup-page.jpg", 
            width: 1200,
            height: 630,
            alt: "Sign Up Page Image",
          },
        ],
        url: "https://yourwebsite.com/signup", 
        type: "website",
        site_name: "Car Doctor",
      },
      twitter: {
        card: "summary_large_image",
        title: "Sign Up for Car Doctor",
        description: "Join us today to enjoy personalized features and exclusive content.",
        images: [
          {
            url: "https://yourwebsite.com/images/signup-page.jpg", 
            alt: "Sign Up Page Image",
          },
        ],
      },
    };
  }
  

const page = () => {
  return <SignUp />;
};

export default page;
