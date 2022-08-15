import Head from "next/head";
import { useIntl } from "react-intl";

import DetailsGeneral from "../components/DetailsGeneral";
import DetailsSupply from "../components/DetailsSupply";
import Faq from "../components/Faq";
import HeaderHeroViewers from "../components/HeaderHeroViewers";
import Roadmap from "../components/Roadmap";
import Steps from "../components/Steps";

export default function Home() {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: "menu.viewers" })} | Noomea</title>
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
