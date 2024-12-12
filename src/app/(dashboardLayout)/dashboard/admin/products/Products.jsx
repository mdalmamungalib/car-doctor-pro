"use client";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import axiosSecure from "../../../../../lib/axios";
import Image from "next/image";
import Link from "next/link";
import { MdEditSquare } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoMdAddCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import DashboardHeadImage from "components/shared/DashboardHeadImage";

export const dynamic = "force-dynamic";

const Products = () => {
  const {
    data: products = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/admin/products/api/new-product`
      );
      return response.data;
    },
  });
  if (isLoading) {
    return <LoadingPage />;
  }

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/dashboard/admin/products/api/product-id/${id}`
          );

          if (res.status === 200 || res.status === 204) {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            refetch();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the product.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the product.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };

  return (
    <div className="p-4 ">
      <DashboardHeadImage
        title={"Manage All Products"}
        subTile={"All Product Details"}
      />
      <div className="flex justify-end mt-4">
        <Link href="/dashboard/admin/products/add-product">
          <button className="flex items-center gap-2 bg-[#FF3811] text-white px-4 py-2 mt-10 rounded-full hover:bg-[#e63610] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]">
            <IoMdAddCircleOutline className="w-6 h-6" />
            <span>Add New Product</span>
          </button>
        </Link>
      </div>
      <div className="w-full mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-700 bg-gray-100">
              <th className="p-3">Delete</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <button
                    onClick={() =>
                      handleDeleteProduct(product?._id)
                    }
                    className="bg-[#444444] hover:bg-[#FF3811] rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]"
                    aria-label="Close"
                  >
                    <RxCross2 className="w-6 h-6 text-white" />
                  </button>
                </td>
                <td className="p-3">
                
                  <Image
                    src={product?.img}
                    alt="User Image"
                    width={150}
                    height={150}
                    className="rounded-lg max-w-[150px] h-[100px]"
                  />
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {product?.title}
                  </h3>
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    ${product?.price}
                  </h3>
                </td>
                <td className="p-3">
                  <div className="text-sm sm:text-lg font-semibold text-[#444444]">
                    <Link
                      href={`/dashboard/admin/products/update-product/${product?._id}`}
                    >
                      <button className="text-2xl button">
                        <MdEditSquare />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
