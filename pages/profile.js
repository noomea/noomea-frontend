import { XIcon } from "@heroicons/react/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import { doc, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ProfileActivation from "../components/ProfileActivation";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";
import { Spinner } from "../components/Spinner";
import { db } from "../firebase-config";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [userDB, setUserDB] = useState({});
  const { connected } = useWallet();
  const intl = useIntl();

  const getUserDB = async (walletAddress) => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, "user", walletAddress), (doc) => {
      setUserDB(doc.data());
      setLoading(false);
    });
  };

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (!walletAddress) return;
    getUserDB(walletAddress);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-black/20 py-20 mb-8">
        <Spinner text={intl.formatMessage({ id: "wallet.loading" })} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: "menu.viewers" })} | Noomea</title>
      </Head>
      <div className="py-20 bg-black/20">
        <div className="container mx-auto">
          {connected ? (
            userDB?.activation ? (
              <ProfileHeader />
            ) : (
              <ProfileActivation user={userDB} />
            )
          ) : (
            <div className="text-center">
              <FormattedMessage id="profile.no_wallet" />
            </div>
          )}
        </div>
      </div>
      {userDB?.activation && userDB?.twitch && connected && (
        <div className="container mx-auto">
          <News id="000001" />
          <ProfileTabs user={userDB} />
        </div>
      )}
    </>
  );
}

const News = (props) => {
  const { id } = props;

  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    const showNews = localStorage.getItem("noomea_hide_news");

    if (showNews !== id) {
      setShowNews(true);
    }
  }, []);

  const handleHideNews = () => {
    localStorage.setItem("noomea_hide_news", id);
    setShowNews(false);
  };

  if (!showNews) return null;

  return (
    <div className="bg-black/20 mt-6 rounded px-4 py-3 text-sm flex">
      <div className="flex-1">
        <strong>
          <FormattedMessage id="news.dropEvent.title" />
        </strong>
        {` `}
        <span className="text-white/80">
          <FormattedMessage id="news.dropEvent.description" />
        </span>
      </div>
      <div
        className="cursor-pointer p-1 text-white/60 hover:text-white transition"
        onClick={handleHideNews}
      >
        <XIcon className="h-4 w-4" />
      </div>
    </div>
  );
};
