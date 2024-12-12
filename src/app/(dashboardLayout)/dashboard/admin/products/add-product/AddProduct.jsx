"use client";
import axiosSecure from "../../../../../../lib/axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import DashboardHeadImage from "components/shared/DashboardHeadImage";

export const dynamic = "force-dynamic";

const AddProduct = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    if (data?.image && data.image.length > 0) {
      const loadingSwal = Swal.fire({
        title: "Uploading...",
        text: "Please wait while we upload your image.",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
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

        const newProduct = {
          title: data?.productName,
          price: data?.productPrice,
          img: imageUrl,
        };


        try {
          const res = await axiosSecure.post(
            "/dashboard/admin/products/api/new-product",
            newProduct
          );
          console.log(res)
          if (res?.status === 201) {
            Swal.close();
            
            Swal.fire({
              title: "Success!",
              text: "Your product has been added successfully!",
              icon: "success",
            });

            reset();
            router.push("/dashboard/admin/products");
          }
        } catch (ProductError) {
          console.error("Error adding Product:", ProductError);

          Swal.fire({
            title: "Error!",
            text: "There was an error adding your Product. Please try again.",
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
        Swal.close(); 
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
      <DashboardHeadImage title={"Add New Product"} subTile={"Add Product"} />
      <div className="h-full max-w-full bg-[#F3F3F3] rounded-[10px] lg:p-[97px] md:p-[97px] p-[10%] mt-[130px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-[50px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Product Name Input */}
            <div className="space-y-1">
              <input
                {...register("productName", {
                  required: "Product name is required",
                })}
                placeholder="Product Name"
                className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.productName && (
                <p className="text-red-500">{errors.productName.message}</p>
              )}
            </div>

            {/* Product Price Input */}
            <div className="space-y-1">
              <input
                {...register("productPrice", {
                  required: "Product Price is required",
                })}
                type="number"
                placeholder="Product Price"
                className="w-full bg-white border border-gray-300 py-2 h-[60px] px-4 rounded-lg focus:outline-none focus:border-[#FF3811] focus:ring-1 focus:ring-[#FF3811]"
              />
              {errors.productPrice && (
                <p className="text-red-500">{errors.productPrice.message}</p>
              )}
            </div>
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
            }`}
            value={loading ? "Adding Product..." : "Add Product"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
