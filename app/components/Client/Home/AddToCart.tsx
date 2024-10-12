import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddToCart = () => {
  return (
    <button className="absolute sm:static top-6 right-16 mt-0.5 sm:mt-0 flex items-center">
      <FontAwesomeIcon
        className="text-gray-100 h-5 sm:p-5 cursor-pointer hover:text-gray-300"
        icon={faCartShopping}
      />
    </button>
  );
};

export default AddToCart;
