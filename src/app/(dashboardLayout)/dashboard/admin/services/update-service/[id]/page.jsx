"use client";
import HeadImage from "components/HomePage/HeadImage";
import { useForm } from "react-hook-form";
import LoadingPage from "components/LoadingPage/LoadingPage";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axiosSecure from "lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export const dynamic = "force-dynamic";

const Page = ({ params }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: service = {},
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["service", params?.id],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/admin/services/api/aservice/${params?.id}`
      );
      return response.data;
    },
  });

  // Show loading page while data is being fetched
  if (isLoading) {
    return <LoadingPage />;
  }

  // Show error message if service data fails to load
  if (isError) {
    return <p>{error.message}</p>;
  }

  // Image upload function
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

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
      if (!imageUrl)
        throw new Error("Image upload failed: No URL returned.");

      return imageUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      throw new Error("Error uploading image.");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true); // Start form submission loading

    try {
      let imageUrl = service?.img; // Use existing image if not updated

      // If a new image is uploaded
      if (data?.image && data.image.length > 0) {
        Swal.fire({
          title: "Uploading Image...",
          text: "Please wait while we upload your image.",
          icon: "info",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        // Upload new image and get the URL
        imageUrl = await uploadImage(data.image[0]);
        Swal.close(); // Close loading after image upload
      }

      // Updated service data
      const updateService = {
        title: data?.serviceName,
        description: data?.serviceDescription,
        price: data?.servicePrice,
        img: imageUrl,
      };

      // API call to update service
      const response = await axiosSecure.patch(
        `/dashboard/admin/services/api/update-services/${params.id}`,
        updateService
      );


      // Handle successful response
      if (response?.status === 200) {
        reset(); // Reset form
        router.push("/dashboard/admin/services"); // Redirect to services
      }
    } catch (error) {
      console.error("Error updating service:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating your service. Please try again.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false); // End form submission loading
    }
  };

  return (
    <div className="">
      <HeadImage title="Update Service" subtitle="Update Service" />
      <div className="h-full max-w-full bg-[#F3F3F3] rounded-[10px] lg:p-[97px] md:p-[97px] p-[10%] my-[130px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-[50px]"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Service Name Input */}
            <div className="space-y-1">
              <input
                defaultValue={service?.title}
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
                defaultValue={service?.price}
                {...register("servicePrice", {
                  required: "Service price is required",
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
              defaultValue={service?.description}
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
                {...register("image")}
                className="block w-full bg-white border border-gray-300 h-[60px] px-4 py-2 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811] text-gray-500 text-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF3811] file:text-white hover:file:bg-[#ff4d2e] cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg bg-[#FF3811] text-white font-medium hover:scale-105 transition transform duration-300 ease-in-out cursor-pointer ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            value={isSubmitting ? "Updating..." : "Update Service"} // Dynamic button text
            disabled={isSubmitting} // Disable button while submitting
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
