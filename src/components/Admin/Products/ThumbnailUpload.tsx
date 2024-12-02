import CustomImage from "@/shared/CustomImage"; // Assuming you have a custom image component

interface ThumbnailUploadProps {
  errors: Record<string, string>;
  mainImage: string | null;
  thumbnails: string[];
  setThumbnails: (images: string[]) => void;
  handleMainUpload: (file: File | null) => void;
  handleThumbnailUpload: (index: number, file: File | null) => void;
  isEditting: boolean;
}

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  errors,
  mainImage,
  thumbnails,
  setThumbnails,
  handleMainUpload,
  handleThumbnailUpload,
  isEditting,
}) => {
  return (
    <div>
      {/* Main Image */}
      <div
        className={`relative flex items-center justify-center bg-gray-50 border-2 aspect-square rounded-lg overflow-hidden mb-4 ${
          errors["image.main"] ? "border-red-500" : "border-gray-300"
        }`}
      >
        {mainImage ? (
          <CustomImage
            src={mainImage}
            alt="Main"
            className="w-full h-full"
            imageClass="object-cover"
            useBucket={isEditting}
            fill
          />
        ) : errors["image.main"] ? (
          <p className="text-red-500 my-1 text-sm h-5 transition-opacity opacity-100">
            {errors["image.main"]}
          </p>
        ) : (
          <span className="text-gray-300 text-5xl font-thin">+</span>
        )}
        <input
          className="opacity-0 absolute inset-0 cursor-pointer"
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleMainUpload(e.target.files ? e.target.files[0] : null);
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-2">
        {thumbnails.map((thumb, index) => (
          <Thumbnail
            key={index}
            index={index}
            thumb={thumb}
            errors={errors}
            handleThumbnailUpload={handleThumbnailUpload}
            isEditting={isEditting}
          />
        ))}

        {/* Add more thumbnails button */}
        <button
          className="w-[94px] aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400"
          onClick={() => setThumbnails([...thumbnails, ""])}
        >
          +
        </button>
      </div>
    </div>
  );
};

// Thumbnail component
const Thumbnail: React.FC<{
  index: number;
  thumb: string;
  errors: Record<string, string>;
  handleThumbnailUpload: (index: number, file: File | null) => void;
  isEditting: boolean;
}> = ({ index, thumb, errors, handleThumbnailUpload, isEditting }) => {
  return (
    <div
      className={`relative flex items-center justify-center bg-gray-50 border-2 aspect-square w-[94px] rounded-lg overflow-hidden ${
        errors["image.thumbnails"] ? "border-red-500" : "border-gray-300"
      }`}
    >
      {thumb ? (
        <CustomImage
          src={thumb}
          alt={`Thumbnail ${index + 1}`}
          className="w-full h-full"
          imageClass="object-cover"
          useBucket={isEditting}
          fill
        />
      ) : errors["image.thumbnails"] ? (
        <p className="text-red-500 my-1 text-xs">
          {errors["image.thumbnails"]}
        </p>
      ) : (
        <span className="text-gray-300 text-2xl font-thin">+</span>
      )}
      <input
        className="opacity-0 absolute inset-0 cursor-pointer"
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleThumbnailUpload(
            index,
            e.target.files ? e.target.files[0] : null
          )
        }
      />
    </div>
  );
};

export default ThumbnailUpload;
