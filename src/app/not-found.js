"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/404');
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-[#151515] ">
      {/* Include the dotlottie-player script */}
      {isClient && (
        <Script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"
        />
      )}

      {/* 404 Animation */}
      <div className="mb-8">
        {isClient && (
          <dotlottie-player
            src="https://lottie.host/c7d2dcbe-7e54-42f7-8562-e8e904491916/rlH4Y06eMa.json"
            background="transparent"
            speed="1"
            className="w-full h-auto"
            direction="1"
            playMode="normal"
            loop
            autoplay
          ></dotlottie-player>
        )}
      </div>

      {/* 404 Message */}
      <h2 className="text-2xl font-bold text-[#FF3811] mb-6">
        Oops! Page not found.
      </h2>
      <p className="mb-12 text-lg">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[#FF3811] text-white font-bold rounded-[10px] hover:bg-white hover:text-[#FF3811] transition-colors duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
