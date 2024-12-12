"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import SocialLogin from "components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axiosSecure from "../../lib/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const SignUp = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/404");
    }
  }, [session, router]);

  const onSubmit = async (data) => {
    const newUser = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const res = await axiosSecure.post(
        "/signup/api",
        newUser
      );
   
      const result = res.data;
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User registered successfully! Please Login.",
          showConfirmButton: true,
          confirmButtonText: "Login", 
          customClass: {
            popup: "bg-[#FF3811]", 
            title: "text-white font-bold", 
            confirmButton:
              "bg-[#444444] text-white px-6 py-3 rounded-lg hover:bg-[#FF3811] transition-all", 
          },
        });

        router.push("/login");
      } else {
       
        console.error("Registration failed:", result); 
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            result.message ||
            "Registration failed. Please try again.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "bg-[#FF3811]",
            title: "text-white font-bold",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data.message || "An error occurred. Please try again later.",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "bg-[#FF3811]",
          title: "text-white font-bold",
        },
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 lg:flex-row lg:py-0">
      <div className="flex justify-center hidden mb-10 lg:block lg:w-1/2 lg:mb-0 ">
        <Image
          src="/assets/images/login/login.svg"
          alt="login"
          width={400}
          height={400}
          className="h-auto max-w-full"
        />
      </div>
      <div className="lg:w-1/2">
        <div className="border-2 border-gray-300 p-8 sm:p-10 md:p-[75px] rounded-lg max-w-lg mx-auto">
          <h2 className="text-3xl md:text-[40px] text-gray-800 font-semibold mb-6 text-center">
            Sign Up
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-[50px]"
          >
            <div className="space-y-1">
              <label className="text-[18px] text-[#444] font-semibold">
                Name
              </label>
              <input
                {...register("name")}
                placeholder="Your Name"
                className="w-full bg-white border border-gray-300 
                py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                disabled={loading} 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[18px] text-[#444] font-semibold">
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Your Email"
                className="w-full bg-white border border-gray-300 
                py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[18px] text-[#444] font-semibold">
                Confirm Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Your Password"
                className="w-full bg-white border border-gray-300 
                py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                disabled={loading} 
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-lg bg-[#FF3811] text-white font-medium hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer flex justify-center items-center"
              disabled={loading} 
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="w-5 h-5 mr-2 animate-spin" /> 
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <h6 className="mt-8 text-lg font-medium text-center text-gray-800">
            Or Sign Up with
          </h6>
          <SocialLogin />
          <h6 className="text-center text-[18px] font-normal text-[#737373] mt-6">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="text-[#FF3811] cursor-pointer hover:underline">
                Login
              </span>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
