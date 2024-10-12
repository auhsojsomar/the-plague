import React from "react";

const Product = ({
  params: { id },
}: {
  params: {
    id: number;
  };
}) => {
  return <div>Single Product {id}</div>;
};

export default Product;
