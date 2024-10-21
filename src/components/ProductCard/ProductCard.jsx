import Image from "next/image";
import React from "react";

const ProductCard = ({ product }) => {
  const { price, img, title, _id } = product;
  return (
    <div className="bg-white border border-gray-200 rounded-lg max-w-full sm:max-w-[300px] md:max-w-[340px] lg:max-w-[364px] min-h-[348px] mx-auto px-[19px] py-[25px]">
      <div className="bg-[#F3F3F3] rounded-[10px] ">
        <figure className="px-[85px] py-[31px]">
          <Image
            height={156}
            width={156}
            src={img}
            alt={title}
            className="rounded-[10px] object-cover w-[156px]  h-[156px]"
          />
        </figure>
      </div>
      <div className="px-4 pb-4 mt-5 space-y-2 text-center sm:px-5 md:px-6 sm:pb-5 md:pb-6">
        <div className="gap-1 rating">
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
            defaultChecked
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
        </div>
        <h2 className="text-xl font-semibold sm:text-xl md:text-2xl">
          {title}
        </h2>
        <h4 className="text-xl font-bold text-[#FF3811]">
          ${price}
        </h4>
      </div>
    </div>
  );
};

export default ProductCard;
