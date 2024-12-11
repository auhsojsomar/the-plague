import { useBannerContext } from "@/src/context/BannerContext";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddBannerButton = () => {
  const { setIsOpen, activeTab, setSelectedBanner } = useBannerContext();

  const handleClick = () => {
    setSelectedBanner(null);
    setIsOpen(true);
  };

  return (
    <div className="p-4 flex justify-end">
      <button
        className="flex items-center gap-1 bg-primary-color px-5 py-3 rounded-lg text-white"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faPlusCircle} />
        <span>{`Add ${activeTab}`}</span>
      </button>
    </div>
  );
};

export default AddBannerButton;
