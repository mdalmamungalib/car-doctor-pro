import React from 'react';
import Login from "./Login"

export async function generateMetadata() {
  return {
    title: "Login",
    description: "Securely log in to access your account, manage your settings, and enjoy personalized features at Car Doctor.",
    keywords: [
      "login",
      "sign in",
      "user account",
      "secure login",
      "Car Doctor",
      "account access",
    ],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: "Login to Car Doctor",
      description: "Access your account on Car Doctor to enjoy personalized features and manage your settings.",
      images: [
        {
          url: "https://yourwebsite.com/images/login-page.jpg", 
          width: 1200,
          height: 630,
          alt: "Login Page Image",
        },
      ],
      url: "https://yourwebsite.com/login", 
      type: "website",
      site_name: "Car Doctor",
    },
    twitter: {
      card: "summary_large_image",
      title: "Login to Car Doctor",
      description: "Sign in to access your account and personalized features.",
      images: [
        {
          url: "https://yourwebsite.com/images/login-page.jpg", 
          alt: "Login Page Image",
        },
      ],
    },
  };
}

const page = () => {
  
  
  return (
   <Login/>
  );
};

export default page;