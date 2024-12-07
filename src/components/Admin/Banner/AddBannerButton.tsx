import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AddBannerButtonProps {
  label: string;
  onClick: () => void;
}

const AddBannerButton: React.FC<AddBannerButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <div className="p-4 flex justify-end">
      <button
        className="flex items-center gap-1 bg-primary-color px-5 py-3 rounded-lg text-white"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faPlusCircle} />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default AddBannerButton;
