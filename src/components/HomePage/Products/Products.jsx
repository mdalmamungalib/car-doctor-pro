"use client";
import ProductCard from "components/ProductCard/ProductCard";
import Link from "next/link";
import React from "react";
import LoadingPage from "components/LoadingPage/LoadingPage";
import axiosSecure from "lib/axios";
import { useQuery } from "@tanstack/react-query";
import HeadLayout from "components/shared/HeadLayout";
export const dynamic = "force-dynamic";

const Products = () => {
  
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/api/get-products`
      );
      return response.data;
    },
  });
  

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <p className="mt-12 text-center text-red-500">
        Error: {error.message}
      </p>
    );
  }
  return (
  
    <div className="mt-[132px] px-4" data-aos="fade-up"
    data-aos-duration="1500">
     
      <HeadLayout
        headTitle="Popular Products"
        title="Browse Our Products"
        description="The majority have suffered alteration in some form, by
          injected humour, or randomised words which don't look even
          slightly believable."
      />

      <div className="grid grid-cols-1 gap-6 mx-auto my-12 lg:grid-cols-3 sm:grid-cols-2">
        {products && products.length > 0 ? (
          products
            .slice(0, 6)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        ) : (
          <p className="text-center text-red-500 col-span-full">
            No product available.
          </p>
        )}
      </div>
      <Link href={"/products"}>
        <div className="w-full text-center">
          <button className="px-5 py-3 text-[#FF3811] transform border border-[#FF3811] rounded hover:scale-105 focus:outline-none focus:ring-opacity-50 hover:bg-[#FF3811] hover:text-white font-semibold">More Products</button>
        </div>
      </Link>
    </div>
  );
};

export default Products;
