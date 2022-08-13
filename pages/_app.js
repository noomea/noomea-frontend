import { Toaster } from "react-hot-toast";

import "../global.css";
import Header from "../components/Header";
import PageLoader from "../components/PageLoader";
import Footer from "../components/Footer";
import BuiltOnSolana from "../components/BuiltOnSolana";
import Providers from "../providers/Providers";
import MenuMobile from "../components/MenuMobile";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <div id="outer-container">
        <MenuMobile pageWrapId="page-wrap" outerContainerId="outer-container" />
        <main id="page-wrap">
          <Header />
          <Component {...pageProps} />
          <Footer />
          <BuiltOnSolana />

          <PageLoader />
          <Toaster position="bottom-right" reverseOrder={false} />
        </main>
      </div>
    </Providers>
  );
}
