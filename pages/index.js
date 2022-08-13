import Head from "next/head";

import DetailsGeneral from "../components/DetailsGeneral";
import DetailsSupply from "../components/DetailsSupply";
import Faq from "../components/Faq";
import HeaderHeroViewers from "../components/HeaderHeroViewers";
import Roadmap from "../components/Roadmap";
import Steps from "../components/Steps";

export default function Home() {
  return (
    <>
      <Head>
        <title>Viewers | Noomea</title>
      </Head>
      <HeaderHeroViewers />
      <Steps />
      <Faq type="viewers" />
      <DetailsGeneral />
      <DetailsSupply />
      <Roadmap />
    </>
  );
}
