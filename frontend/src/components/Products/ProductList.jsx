import React from "react";
import { products } from "../../assets/data/products";
import ProductCard from "../Products/ProductCard";

const ProductList = () => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] 
  mt-[30px] lg:mt-[55px]"
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
};

export default ProductList;
