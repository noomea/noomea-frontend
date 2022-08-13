import Head from "next/head";
import { useContext } from "react";

import ApplyForCreator from "../components/ApplyForCreator";
import CreatorsList from "../components/CreatorsList";
import Faq from "../components/Faq";
import HeaderHeroCreators from "../components/HeaderHeroCreators";
import Steps from "../components/Steps";
import { AppContext } from "../providers/appContext";

export default function Creators() {
  const { partneredCreators, onlinePartneredCreators } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>Creators | Noomea</title>
      </Head>
      <HeaderHeroCreators />
      <Steps type="creators" />
      <CreatorsList
        partneredCreators={partneredCreators}
        onlinePartneredCreators={onlinePartneredCreators}
      />
      <div className="container mx-auto p-4 mt-8 mb-4 border-white/10 border-b-4 relative pb-32">
        <ApplyForCreator />
      </div>
      <Faq type="creators" />
    </>
  );
}
