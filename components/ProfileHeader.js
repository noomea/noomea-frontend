import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { doc, onSnapshot } from "firebase/firestore";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { toast } from "react-hot-toast";
import Image from "next/image";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";

import ButtonGradient from "./ButtonGradient";
import TextGradient from "./TextGradient";
import {
  addMultiAccountFlag,
  addTwitchDetailsUser,
  getListConnectTwitch,
  getTransaction,
  redeemTokens,
  removeTwitchDetailsUser,
} from "../api/firebase";
import { displayFullAddress } from "../utils";
import { db } from "../firebase-config";
import { Spinner } from "./Spinner";
import { twitchGetOauthToken, twitchGetUserDetails } from "../api/twitch";
import { FormattedMessage, useIntl } from "react-intl";

function ProfileHeader(props) {
  const [userDB, setUserDB] = useState({});
  const [loading, setLoading] = useState(false);

  const { publicKey } = useWallet();
  const router = useRouter();
  const intl = useIntl();

  const redeemableTokens =
    Math.round(
      (userDB?.drops?.reduce((total, drop) => {
        if (drop.redeemed) return total;

        return (total += drop.amount);
      }, 0) || 0) * 10
    ) / 10;

  const getUserDetails = async (code, walletAddress, loadingCallback) => {
    const oauthToken = await twitchGetOauthToken(code);
    const twitchData = await twitchGetUserDetails(oauthToken.access_token);
    const listConnectTwitch = await getListConnectTwitch();

    const userExist = listConnectTwitch.includes(twitchData.login);

    if (userExist) {
      await addMultiAccountFlag(walletAddress, twitchData.login);

      const toastAccountEExists = toast.error(
        (t) => (
          <div>
            <XIcon
              className="absolute top-2 right-2 h-6 w-6 p-1 hover:bg-black/10 rounded-full"
              onClick={() => toast.dismiss(t.id)}
            />
            <h4 className="font-medium text-lg">
              <FormattedMessage id="notifications.already_exists.title" />
            </h4>
            <p className="text-sm text-black/70">
              <FormattedMessage id="notifications.already_exists.description" />
            </p>
          </div>
        ),
        {
          duration: 8000,
        }
      );
    } else {
      await addTwitchDetailsUser(walletAddress, twitchData);
      const toastAccountReady = toast.success(
        (t) => (
          <div>
            <XIcon
              className="absolute top-2 right-2 h-6 w-6 p-1 hover:bg-black/10 rounded-full"
              onClick={() => toast.dismiss(t.id)}
            />
            <h4 className="font-medium text-lg">
              <FormattedMessage id="notifications.account_set.title" />
            </h4>
            <p className="text-sm text-black/70">
              <FormattedMessage id="notifications.account_set.title" />
            </p>
          </div>
        ),
        {
          duration: 8000,
        }
      );
    }
    loadingCallback();
  };

  const loadingCallback = () => {
    setLoading(false);
  };

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    if (code) {
      setLoading(true);
      getUserDetails(code, walletAddress, loadingCallback);
      router.push("/profile");
    }

    const unsub = onSnapshot(doc(db, "user", walletAddress), (doc) => {
      setUserDB(doc.data());
    });
  }, [publicKey]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner text={intl.formatMessage({ id: "wallet.loading" })} />
      </div>
    );
  }

  const lastRedeemDate = userDB?.lastRedeem?.toDate();
  const nowDate = new Date();
  const msBetweenDates = Math.abs(
    lastRedeemDate?.getTime() - nowDate.getTime()
  );
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  const claimedRecently = hoursBetweenDates < 24;

  return (
    <div className="text-center">
      {userDB?.twitch?.display_name ? (
        <>
          <div className="inline-flex space-x-2 items-center  mb-10">
            <div className="inline-flex items-center space-x-2 text-[#ff00b1] bg-black/20 px-6 py-3 rounded-full text-xs font-bold">
              <CheckIcon width={20} />
              <TextGradient>
                <FormattedMessage id="profile.twitch_associated" />
              </TextGradient>
            </div>
            <RedeemTokens
              amount={redeemableTokens}
              claimedRecently={claimedRecently}
            />
          </div>

          <div className="flex items-center justify-center">
            <img
              src={userDB.twitch.profile_image_url}
              className="rounded-full p-1 w-14 h-14 mr-4 border-4 border-white/20"
            />
            <span className="text-2xl">{userDB.twitch.display_name}</span>
          </div>

          <button
            hidden
            className="text-xs"
            onClick={() =>
              removeTwitchDetailsUser(displayFullAddress(publicKey))
            }
          >
            remove twitch
          </button>
        </>
      ) : (
        <>
          <div className="inline-flex items-center space-x-2 text-[#ff00b1] bg-black/20 px-6 py-3 rounded-full text-xs font-bold mb-10">
            <CheckIcon width={20} />
            <TextGradient>
              <formatMessage id="profile.account_activated" />
            </TextGradient>
          </div>
          <br />
          <a
            href={`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_TWITCH_API_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_TWITCH_URL_REDIRECT}&response_type=code&scope=user:read:email`}
            onClick={() => setLoading(true)}
          >
            <ButtonGradient>
              <FormattedMessage id="profile.connect_twitch" />
            </ButtonGradient>
          </a>
        </>
      )}
    </div>
  );
}

export default ProfileHeader;

const RedeemTokens = (props) => {
  const { amount, claimedRecently } = props;

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [loadingRedeem, setLoadingRedeem] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  const handleRedeemTokens = async (walletAddress, amount) => {
    setLoadingRedeem(true);

    const toastId = toast.loading((t) => (
      <div>
        <h4 className="font-medium text-lg">
          <FormattedMessage id="notifications.transaction.approving.title" />
        </h4>
        <p className="text-sm text-black/70">
          <FormattedMessage id="notifications.transaction.approving.title" />
        </p>
      </div>
    ));

    try {
      const transaction = await getTransaction(walletAddress);
      const signature = await sendTransaction(transaction, connection);

      toast.loading(
        (t) => (
          <div>
            <h4 className="font-medium text-lg">
              <FormattedMessage id="notifications.transaction.claiming.title" />
            </h4>
            <p className="text-sm text-black/70">
              <FormattedMessage id="notifications.transaction.claiming.description" />
            </p>
          </div>
        ),
        {
          id: toastId,
        }
      );

      const resultRedeem = await redeemTokens(walletAddress, amount);

      if (resultRedeem.type === "success") {
        toast.success(
          (t) => (
            <div>
              <h4 className="font-medium text-lg">
                <FormattedMessage id="notifications.transaction.confirmed.title" />
              </h4>
              <p className="text-sm text-black/70">
                <FormattedMessage id="notifications.transaction.confirmed.description" />
              </p>
            </div>
          ),
          {
            id: toastId,
          }
        );
      } else {
        toast.error(
          (t) => (
            <div>
              <XIcon
                className="absolute top-2 right-2 h-6 w-6 p-1 hover:bg-black/10 rounded-full"
                onClick={() => toast.dismiss(t.id)}
              />
              <h4 className="font-medium text-lg">
                <FormattedMessage id="notifications.transaction.error.title" />
              </h4>
              <p className="text-sm text-black/70">
                <FormattedMessage id="notifications.transaction.error.description" />
              </p>
            </div>
          ),
          {
            id: toastId,
          }
        );
      }
    } catch (err) {
      toast.error(
        (t) => (
          <div>
            <XIcon
              className="absolute top-2 right-2 h-6 w-6 p-1 hover:bg-black/10 rounded-full"
              onClick={() => toast.dismiss(t.id)}
            />
            <h4 className="font-medium text-lg">
              <FormattedMessage id="notifications.transaction.error.title" />
            </h4>
            <p className="text-sm text-black/70">
              <FormattedMessage id="notifications.transaction.error.description" />
            </p>
          </div>
        ),
        {
          id: toastId,
        }
      );
    }

    setLoadingRedeem(false);
  };

  return (
    <>
      <div
        className={clsx(
          "inline-flex space-x-2 justify-center items-center bg-black/20 rounded-full px-1.5 py-0.5 pr-6",
          { ["cursor-not-allowed"]: claimedRecently }
        )}
        data-tip={claimedRecently ? "You can claim only every 24 hours" : ""}
      >
        <div className="px-3 py-1 pr-5 rounded-full flex items-center justify-center space-x-2 bg-cyan-600/30">
          <Image src="/noomea-icon-colors.svg" width="24" height="26" />
          <span className="mx-2 font-bold text-sm">{amount}</span>
        </div>

        <button
          onClick={() =>
            handleRedeemTokens(displayFullAddress(publicKey), amount)
          }
          className={clsx(
            "transition relative inline-block font-bold rounded-lg px-3 py-3 text-xs cursor-pointer group text-white/80  hover:text-white",
            {
              ["pointer-events-none cursor-default text-white/20 opacity-30"]:
                amount === 0 || claimedRecently,
            }
          )}
          disabled={amount === 0 || claimedRecently}
        >
          <div className="group-active:scale-90 relative transition-all">
            <span>{loadingRedeem ? "loading" : "Claim now"}</span>
          </div>
        </button>
      </div>
    </>
  );
};
