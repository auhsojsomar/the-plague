import { MESSAGE } from "@/src/constants";

const BestProductTitle = () => {
  const { BEST_PRODUCT: { title } = {} } = MESSAGE;
  return (
    <>
      <h1 className="text-white uppercase text-center text-3xl">{title}</h1>
      <div className="flex justify-center py-5">
        <div className="rounded-full h-5 w-5 border-2 border-solid relative before:content-[''] before:block before:h-0.5 before:w-14 before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[4.7rem] after:content-[''] after:block after:h-0.5 after:w-14 after:bg-white after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[4.7rem]"></div>
      </div>
    </>
  );
};

export default BestProductTitle;
