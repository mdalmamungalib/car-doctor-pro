"use client";
import HeadImage from "components/HomePage/HeadImage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axiosSecure from "lib/axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const reviewData = {
        userName: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        ...data,
        rating,
      };
      const loadingSwal = Swal.fire({
        title: "Submitting...",
        text: "Please wait while your review is being submitted.",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        },
      });
      
      const res = await axiosSecure.post(
        "/dashboard/user/review/api/post-review",
        reviewData
      );


      if (res?.status === 201) {
        router.push("/dashboard/user/order-review");
        Swal.fire({
          title: "Review Submitted!",
          text: "Thank you for your feedback!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF3811",
          customClass: {
            confirmButton:
              "bg-[#FF3811] text-white py-2 px-4 rounded-full",
            title: "text-xl font-bold text-[#444444]",
            htmlContainer: "text-sm text-[#555555]",
          },
        });

        reset();
      }
    } catch (error) {
      console.error("Error submitting review:", error);

      Swal.fire({
        title: "Error!",
        text: "There was an error submitting your review. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF3811",
        customClass: {
          confirmButton:
            "bg-[#FF3811] text-white py-2 px-4 rounded-full",
          title: "text-xl font-bold text-[#444444]",
          htmlContainer: "text-sm text-[#555555]",
        },
      });
    } finally {
      setLoading(false); 
      Swal.close(); 
    }
  };

  const StarDrawing = (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.788 3.21009C11.236 2.13309 12.764 2.13309 13.212 3.21009L15.294 8.21709L20.698 8.65009C21.862 8.74309 22.334 10.1951 21.447 10.9551L17.33 14.4821L18.587 19.7551C18.858 20.8911 17.623 21.7881 16.627 21.1801L12 18.3541L7.373 21.1801C6.377 21.7881 5.142 20.8901 5.413 19.7551L6.67 14.4821L2.553 10.9551C1.666 10.1951 2.138 8.74309 3.302 8.65009L8.706 8.21709L10.788 3.21109V3.21009Z"
    />
  );

  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#FF912C",
    inactiveFillColor: "#E5E7EB",
  };

  return (
    <div className="">
      <HeadImage title="Add New Review" subtitle="Review" />

      <div className="h-full max-w-full bg-[#F3F3F3] rounded-[10px] lg:p-[97px] md:p-[97px] p-[10%] mt-[130px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-[50px]"
        >
          {/* Position Input Field */}
          <div className="space-y-1">
            <input
              {...register("position", {
                required: "Your position name is required",
              })}
              placeholder="Your Position"
              className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
            />
            {errors.position && (
              <p className="text-red-500">
                {errors.position.message}
              </p>
            )}
          </div>

          {/* Review Description Text Area */}
          <div className="space-y-1">
            <textarea
              {...register("description", {
                required: "Review description is required",
              })}
              placeholder="Review Description"
              className="w-full bg-white border border-gray-300 py-6 h-[250px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
            />
            {errors.description && (
              <p className="text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Star Rating Component */}
          <Rating
            style={{ maxWidth: 200 }}
            value={rating}
            onChange={setRating}
            itemStyles={customStyles}
          />

          {/* Submit Button */}
          <input
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg bg-[#FF3811] text-white font-medium hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            value={
              loading ? "Submitting Review..." : "Submit Review"
            }
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
