import { ProductDto } from "@/shared/interfaces/ProductDto";
import CustomImage from "@/shared/CustomImage";

interface ImageCellRendererProps {
  value: string;
  data: ProductDto;
}

const ImageCellRenderer: React.FC<ImageCellRendererProps> = ({
  value,
  data,
}) => {
  return (
    <div className="w-20 h-20">
      <CustomImage
        className="w-full h-full"
        imageClass="object-cover w-full h-full"
        src={value}
        alt={data.name}
      />
    </div>
  );
};

export default ImageCellRenderer;
