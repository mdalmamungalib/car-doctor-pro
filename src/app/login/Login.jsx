"use client";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export const dynamic = "force-dynamic";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        router.push("/404");
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); 

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: path ? path : "/",
      });

      if (res.error) {
        console.error("Error during sign-in:", res.error);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signed in successfully!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "bg-[#FF3811]",
            title: "text-white font-bold",
          },
        });

        setTimeout(() => {
          window.location.href = redirect;
        }, 1500);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred. Please try again later.",
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
      <div className="flex justify-center hidden mb-10 lg:block lg:w-1/2 lg:mb-0">
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
            Login
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-[50px]"
          >
            <div className="space-y-1">
              <label className="text-[18px] text-[#444] font-semibold">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Your Email"
                className="w-full bg-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                disabled={loading} 
              />
              {errors.email && (
                <p className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[18px] text-[#444] font-semibold">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Your Password"
                className="w-full bg-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
                disabled={loading} 
              />
              {errors.password && (
                <p className="text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded-lg bg-[#FF3811] text-white font-medium hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer flex justify-center items-center"
              disabled={loading} 
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="w-5 h-5 mr-2 animate-spin" /> 
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <h6 className="mt-8 text-lg font-medium text-center text-gray-800">
            Or Sign Up with
          </h6>
          <SocialLogin />
          <h6 className="text-center text-[18px] font-normal text-[#737373] mt-6">
            Don’t have an account?{" "}
            <Link href={"/signup"}>
              <span className="text-[#FF3811] cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Login;
