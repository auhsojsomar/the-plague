interface ProductPageQuantityButtonProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const ProductPageQuantityButton: React.FC<ProductPageQuantityButtonProps> = ({
  quantity,
  onQuantityChange,
}) => {
  const increment = () => onQuantityChange(quantity + 1);
  const decrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  return (
    <div className="flex items-center w-fit rounded-md space-x-4 border">
      <button
        onClick={decrement}
        className="w-10 h-10 flex justify-center items-center bg-gray-300 hover:bg-gray-400 text-lg rounded-l"
      >
        -
      </button>
      <span className="text-xl text-center min-w-6 font-medium">
        {quantity}
      </span>
      <button
        onClick={increment}
        className="w-10 h-10 flex justify-center items-center bg-gray-300 hover:bg-gray-400 text-lg rounded-r"
      >
        +
      </button>
    </div>
  );
};

export default ProductPageQuantityButton;
