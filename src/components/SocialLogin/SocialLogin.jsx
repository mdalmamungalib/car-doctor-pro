"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleSocialLogin = async (provider) => {
    setLoading(true); 

    try {
      
      const result = await signIn(provider, {
        redirect: false, 
        callbackUrl: path ? path : "/",
      });

      setLoading(false);

      if (result.error) {
        Swal.fire({
          title: "Login Failed",
          text: "Please try again.",
          icon: "error",
          confirmButtonColor: "#FF3811",
          customClass: {
            confirmButton: "bg-[#FF3811] text-white py-2 px-4 rounded-full",
          },
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "You are now logged in. Redirecting...",
          icon: "success",
          timer: 2000, 
          confirmButtonColor: "#FF3811",
          customClass: {
            confirmButton: "bg-[#FF3811] text-white py-2 px-4 rounded-full",
          },
        }).then(() => {
          window.location.href = path ? path : "/";
        });
      }
    } catch (error) {
      setLoading(false); 
      console.error("Error during social login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      {loading ? (
        <div className="flex items-center justify-center">
          <p className="text-lg font-semibold">Logging in...</p>
        </div>
      ) : (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="bg-[#F5F5F8] rounded-full p-3 transition hover:bg-gray-100"
          >
            <FaFacebookF className="text-[#3b5998] text-2xl" />
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            className="bg-[#F5F5F8] rounded-full p-3 transition hover:bg-gray-100"
          >
            <FaGithub className="text-[#0a66c2] text-2xl" />
          </button>
          <button
            onClick={() => handleSocialLogin("google")}
            className="bg-[#F5F5F8] rounded-full p-3 transition hover:bg-gray-100"
          >
            <FcGoogle className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialLogin;
