import { Checkbox, Label } from "flowbite-react";
import { CategoryLabel } from "@/src/types/sidebar/sidebar";

interface ProductCategoryListProps {
  categories: CategoryLabel[];
}

const ProductCategoryList: React.FC<ProductCategoryListProps> = ({
  categories,
}) => {
  return (
    <>
      {categories?.map(({ id, name }) => (
        <div key={id} className="flex items-center gap-2">
          <Checkbox
            className="cursor-pointer checked:bg-primary-color focus:ring-0 focus:ring-gray-50"
            id={`category_${id}`}
          />
          <Label htmlFor={`category_${id}`}>{name}</Label>
        </div>
      ))}
    </>
  );
};

export default ProductCategoryList;
