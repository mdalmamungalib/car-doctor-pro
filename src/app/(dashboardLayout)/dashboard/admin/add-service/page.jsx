"use client";
import HeadImage from "components/HomePage/HeadImage";
import axiosSecure from "lib/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // State to manage services
  const [services, setServices] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Fetch services (assuming this is the endpoint to get the services)
  const fetchServices = async () => {
    try {
      const response = await axiosSecure.get(
        "/dashboard/admin/get-services"
      );
      setServices(response.data); // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices(); // Fetch services on component mount
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    if (data?.image && data.image.length > 0) {
      // Show loading indicator
      const loadingSwal = Swal.fire({
        title: "Uploading...",
        text: "Please wait while we upload your image.",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Show loading spinner
        },
      });

      try {
        const response = await axiosSecure.post(
          process.env.NEXT_PUBLIC_IMAGEBBURL,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: false,
          }
        );

        const imageUrl = response?.data?.data?.display_url;

        if (!imageUrl) {
          throw new Error("Image upload failed: No URL returned.");
        }

        const newService = {
          title: data?.serviceName,
          description: data?.serviceDescription,
          price: data?.servicePrice,
          img: imageUrl,
        };

        try {
          const res = await axiosSecure.post(
            "/dashboard/admin/add-service/api/post-service",
            newService
          );
          if (res?.status === 201 && res.data?.status === 201) {
            reset();
            setServices((prev) => [...prev, newService]);
            router.push("/dashboard/admin/services");
            Swal.fire({
              title: "Service Added!",
              text: "Your Service has been successfully added. Would you like to check all Service or continue shopping?",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Check All Service",
              cancelButtonText: "Add Service",
              confirmButtonColor: "#FF3811",
              cancelButtonColor: "#444444",
              buttonsStyling: false,
              customClass: {
                confirmButton:
                  "bg-[#FF3811] text-white py-2 px-4 rounded-full mx-2",
                cancelButton:
                  "bg-[#444444] text-white py-2 px-4 rounded-full mx-2",
                popup: "rounded-xl shadow-lg",
                title: "text-xl font-bold text-[#444444]",
                htmlContainer: "text-sm text-[#555555]",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/dashboard/user/my-booking"; // Redirect to bookings page
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                window.location.href = "/services"; // Redirect to shopping page
              }
            });
          }
        } catch (serviceError) {
          console.error("Error adding service:", serviceError);
          Swal.fire({
            title: "Error!",
            text: "There was an error adding your service. Please try again.",
            icon: "error",
          });
        }
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        Swal.fire({
          title: "Upload Failed!",
          text: "There was an error uploading your image. Please try again.",
          icon: "error",
        });
      } finally {
        Swal.close(); // Close the loading dialog
      }
    } else {
      Swal.fire({
        title: "No Image!",
        text: "Please select an image to upload.",
        icon: "warning",
      });
    }
  };

  return (
    <div className="">
      <HeadImage title="Add New Service" subtitle="Service" />
      <div className="h-full max-w-full bg-[#F3F3F3] rounded-[10px] lg:p-[97px] md:p-[97px] p-[10%] my-[130px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-[50px]"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Service Name Input */}
            <div className="space-y-1">
              <input
                {...register("serviceName", {
                  required: "Service name is required",
                })}
                placeholder="Service Name"
                className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.serviceName && (
                <p className="text-red-500">
                  {errors.serviceName.message}
                </p>
              )}
            </div>

            {/* Service Price Input */}
            <div className="space-y-1">
              <input
                {...register("servicePrice", {
                  required: "Service Price is required",
                })}
                type="number"
                placeholder="Service Price"
                className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.servicePrice && (
                <p className="text-red-500">
                  {errors.servicePrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Service Description Input */}
          <div className="space-y-1">
            <textarea
              {...register("serviceDescription", {
                required: "Service description is required",
              })}
              placeholder="Service Description"
              className="w-full bg-white border border-gray-300 py-6 h-[250px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
            />
            {errors.serviceDescription && (
              <p className="text-red-500">
                {errors.serviceDescription.message}
              </p>
            )}
          </div>

          {/* Upload Image Input */}
          <div className="space-y-1">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="file-upload"
            >
              Upload Image
            </label>
            <div className="w-full">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                })}
                className="block w-full bg-white border border-gray-300 h-[60px] px-4 py-2 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811] text-gray-500 text-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF3811] file:text-white hover:file:bg-[#ff4d2e] cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg bg-[#FF3811] text-white font-medium hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`} // Disable button while loading
            value={loading ? "Adding Service..." : "Add Service"} // Show loading text
            disabled={loading} // Disable button while loading
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
