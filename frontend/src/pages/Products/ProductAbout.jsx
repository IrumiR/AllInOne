import React from "react";

const ProductAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Azure Bliss: Luxurious Blue Curved Sofa
        </h3>
      </div>

      <div className="mt-12">
        <h3 className="text-20px leading-[30px] text-headingColor font-semibold">
          Product Details
        </h3>

        <ul className="pt-4 md:p-5">
         <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
          <div>
            <span className="text-[15px] leading-6 font-medium text-textColor">
            Size
          Dimensions: 80 inches (W) x 35 inches (H) x 40 inches (D).
          Seat Height: 18 inches.
          Arm Height: 25 inches.
          
          Material
          Outer Material: Premium velvet upholstery.
          Inner Material: High-density foam cushions.
          wrapped in soft polyester fiber.
          Frame: Sturdy hardwood frame for durability and stability.
          
          Additional Attributes
          Curved design for ergonomic comfort and modern appeal.
          Includes two matching throw pillows for added style and comfort.
          Features sleek tapered legs in a dark espresso finish.
          Weight Capacity: Up to 600 lbs.
          Easy assembly required (instructions included) Suitable for residential or
          commercial use.
          Manufacturer's Warranty: 1 year against manufacturing defects.
            </span>
          </div>
         </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductAbout;
