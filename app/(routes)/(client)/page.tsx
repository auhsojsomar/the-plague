import Home from "@/app/components/Client/Home/Home";
import Footer from "@/app/components/Client/Layout/Footer/Footer";

import { Suspense } from "react";
import Loading from "./loading";

const HomePage = async () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Home /> {/* Renders first */}
        <Footer /> {/* Suspends rendering until Home finishes */}
      </Suspense>
    </>
  );
};

export default HomePage;
