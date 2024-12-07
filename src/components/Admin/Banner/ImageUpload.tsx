import CustomImage from "@/shared/CustomImage";

const ImageUpload = ({
  hasError,
  imagePath,
  isEditting,
  handleMainUpload,
}: {
  hasError: { [key: string]: boolean };
  imagePath: string;
  isEditting: boolean;
  handleMainUpload: (file: File | null) => void;
}) => {
  return (
    <div
      className={`relative flex items-center justify-center bg-gray-50 border-2 aspect-square rounded-lg overflow-hidden mb-4 ${
        hasError["image.main"] ? "border-red-500" : "border-gray-300"
      }`}
    >
      <CustomImage
        src={imagePath}
        alt="Main"
        className="w-full h-full"
        imageClass="object-cover"
        useBucket={isEditting}
        fill
      />
      {hasError["image.main"] ? (
        <p className="text-red-500 my-1 text-sm h-5 transition-opacity opacity-100">
          Main image is required.
        </p>
      ) : (
        <span className="text-gray-300 text-5xl font-thin">+</span>
      )}
      <input
        className="opacity-0 absolute inset-0 cursor-pointer"
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleMainUpload(e.target.files ? e.target.files[0] : null)
        }
      />
    </div>
  );
};

export default ImageUpload;
