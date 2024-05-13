import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const SidePanel = () => {
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          25000 LKR
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Cash on Delivery Available
        </p>
        <span>
          <CiDeliveryTruck size={25} />
        </span>
      </div>

      <button className="btn px-2 w-full rounded-md">Buy Now</button>
      <button className="btn px-2 w-full rounded-md">Add To Cart</button>
    </div>
  );
};

export default SidePanel;
