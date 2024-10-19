import Home from "@/app/components/Client/Home/Home";
import Footer from "@/app/components/Client/Layout/Footer/Footer";

import { Suspense } from "react";
import Loading from "./loading";
import BackToTopButton from "@/app/components/Shared/BackToTopButton";

const HomePage = async () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Home /> {/* Renders first */}
        <Footer /> {/* Suspends rendering until Home finishes */}
        <BackToTopButton />
      </Suspense>
    </>
  );
};

export default HomePage;
