import { faComment, faShare, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BestProductFooter = () => {
  const IconButton = ({
    icon,
    title,
    description,
  }: {
    icon: any;
    title: string;
    description: string;
  }) => (
    <div className="group flex flex-col text-white items-center py-6">
      <div
        className="
          outline outline-1 outline-white flex justify-center items-center rounded-full w-20 h-20 
          transition-colors duration-300 group-hover:bg-primary-color group-hover:outline-0
        "
      >
        <FontAwesomeIcon className="text-3xl ml-1" icon={icon} />
      </div>
      <span
        className="
          text-lg my-6 uppercase relative
          after:content-[''] after:bg-white after:absolute after:-bottom-4 after:left-1/2
          after:-translate-x-1/2 after:w-6 after:h-[1px] 
          transition-colors duration-300 group-hover:after:bg-primary-color
        "
      >
        {title}
      </span>
      <span>{description}</span>
    </div>
  );

  return (
    <>
      <div
        className="w-full relative flex justify-center py-6
            before:content-[''] before:absolute before:bg-white before:h-0.5 
            before:w-[42%] before:top-1/2 before:left-0 before:-translate-y-1/2 
            after:content-[''] after:absolute after:bg-white after:h-0.5 
            after:w-[42%] after:top-1/2 after:right-0 after:-translate-y-1/2
      "
      >
        <button
          className="
            rounded-full text-gray-50 border-2 uppercase px-10 py-2 
            hover:bg-primary-color hover:border-transparent transition-all duration-300
          "
        >
          View all
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between md:justify-around">
        <IconButton
          icon={faTruck}
          title="Free shipping"
          description="Place your text here."
        />
        <IconButton
          icon={faShare}
          title="100% Money back"
          description="Place your text here."
        />
        <IconButton
          icon={faComment}
          title="Online support"
          description="Place your text here."
        />
      </div>
    </>
  );
};

export default BestProductFooter;
