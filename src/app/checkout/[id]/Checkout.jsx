"use client";
import HeadImage from "components/HomePage/HeadImage";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axiosSecure from "../../../lib/axios";
import { useState } from "react";
export const dynamic = "force-dynamic";

const Checkout = ({ data }) => {
  
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true); 
    const newBooking = {
      name: `${formData?.firstName} ${formData?.lastName}`,
      email: formData?.email,
      phone: formData?.phone,
      message: formData?.message,
      service: data?.title,
      price: data?.price,
      image: data?.img,
      bookingData: new Date(),
      status: "Pending"
    };

    try {
      const res = await axiosSecure.post(
        "/checkout/api/new-booking",
        newBooking
      );

      if (res?.status === 201) {
        reset();
        router.push("/");

        Swal.fire({
          title: "Booking Added!",
          text: "Your booking has been successfully added. Would you like to check all bookings or continue shopping?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Check All Bookings",
          cancelButtonText: "Continue Shopping",
          confirmButtonColor: "#FF3811",
          cancelButtonColor: "#444444",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-[#FF3811] text-white py-2 px-4 rounded-full mx-2",
            cancelButton: "bg-[#444444] text-white py-2 px-4 rounded-full mx-2",
            popup: "rounded-xl shadow-lg",
            title: "text-xl font-bold text-[#444444]",
            htmlContainer: "text-sm text-[#555555]",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard/user/my-booking";
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = "/services";
          }
        });
      }
    } catch (err) {
      console.error("Error fetching service data:", error);

    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className="">
      <HeadImage title="Check Out" subtitle="Checkout" />
      <div className="h-full max-w-full bg-[#F3F3F3] rounded-[10px] lg:p-[97px] md:p-[97px] p-[10%] mt-[130px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-[50px]"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name Input */}
            <div className="space-y-1">
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                defaultValue={session?.user?.name?.split(" ")[0]} 
                placeholder="First Name"
                className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.firstName && (
                <p className="text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name Input */}
            <div className="space-y-1">
              <input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                defaultValue={session?.user?.name
                  ?.split(" ")
                  .slice(1)
                  .join(" ")} 
                placeholder="Last Name"
                className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.lastName && (
                <p className="text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="space-y-1">
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/, 
                    message: "Please enter a valid phone number",
                  },
                })}
                type="tel" 
                placeholder="Your Phone"
                className="w-full h-[60px] bg-white border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.phoneNumber && (
                <p className="text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                defaultValue={session?.user?.email} 
                type="text"
                placeholder="Your Email"
                className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.email && (
                <p className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-1">
            <textarea
              {...register("message", {
                required: "Message is required",
              })}
              placeholder="Your Message"
              className="w-full bg-white border border-gray-300 py-6 h-[250px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
            />
            {errors.message && (
              <p className="text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg text-white font-medium transition-transform duration-300 ease-in-out cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF3811] hover:scale-105"
            }`}
            value={loading ? "Processing..." : "Order Confirm"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Checkout;
