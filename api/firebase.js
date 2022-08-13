import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import axios from "axios";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";

import { db } from "../firebase-config";
import { SOLANA_RPC_API } from "../variables";

export const createUser = async (address) => {
  try {
    const docRef = doc(db, "user", address.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        _updateTimestamp: serverTimestamp(),
      });
    } else {
      await setDoc(doc(db, "user", address.toString()), {
        wallet: {
          address: address.toString(),
          type: "Phantom",
        },
        _createTimestamp: serverTimestamp(),
        _updateTimestamp: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (address) => {
  try {
    const docRef = doc(db, "user", address.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
};

export const addTwitchDetailsUser = async (address, twitch) => {
  try {
    const {
      broadcaster_type,
      created_at,
      description,
      display_name,
      email,
      id,
      login,
      profile_image_url,
      type,
      view_count,
    } = twitch;

    const docRef = doc(db, "user", address.toString());

    await updateDoc(docRef, {
      twitch: {
        broadcaster_type,
        created_at,
        description,
        display_name,
        email,
        id,
        login,
        profile_image_url,
        type,
        view_count,
      },
    });

    // Add into shortQuery for API query cron
    const quickQueryRef = doc(db, "quickQuery", "infos");

    await updateDoc(quickQueryRef, {
      listConnectTwitch: arrayUnion(display_name),
    });
  } catch (error) {
    console.log(error);
  }
};

export const addMultiAccountFlag = async (address, twitchLogin) => {
  const flagName = "twitch_multi_accounts";

  try {
    const docRef = doc(db, "user", address.toString());
    const flags = {};
    flags[`${flagName}`] = twitchLogin;

    await updateDoc(docRef, {
      flags,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeTwitchDetailsUser = async (address) => {
  try {
    const docRef = doc(db, "user", address.toString());

    await updateDoc(docRef, {
      twitch: deleteField(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const redeemTokens = async (walletAddress) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      walletAddress,
    };

    await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_END_API}/redeem-tokens`,
      data,
      config
    );

    return {
      type: "success",
    };
  } catch (err) {
    console.error(err);
    return {
      type: "error",
    };
  }
};

export const getTransaction = async (walletAddress) => {
  const data = {
    fromPubkey: new PublicKey(walletAddress),
    toPubkey: new PublicKey(SOLANA_RPC_API.tokenPubkey),
    lamports: 1000000,
  };

  const transaction = new Transaction().add(SystemProgram.transfer(data));

  return transaction;
};

export const getPartneredCreators = async () => {
  try {
    let linkedUsers = [];
    let creatorData = [];
    const collectionRef = collection(db, "creator");

    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      linkedUsers.push(docData.linkedUser);
    });

    for await (let linkedUser of linkedUsers) {
      const creatorSnapshot = await getDoc(linkedUser);
      creatorData.push(creatorSnapshot.data());
    }

    return creatorData;
  } catch (error) {
    console.log(error);
  }
};

export const getOnlinePartneredCreators = async (creators) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_API}/who-is-online`
    );

    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const getListConnectTwitch = async () => {
  try {
    const quickQueryRef = doc(db, "quickQuery", "infos");
    const quickQuerySnapshot = await getDoc(quickQueryRef);
    const quickQueryData = quickQuerySnapshot.data();

    return quickQueryData.listConnectTwitch;
  } catch (err) {
    console.log(err);
  }
};

export const getQuickQueryInfos = async () => {
  try {
    const quickQueryRef = doc(db, "quickQuery", "infos");
    const quickQuerySnapshot = await getDoc(quickQueryRef);
    const quickQueryData = quickQuerySnapshot.data();

    return quickQueryData;
  } catch (err) {
    console.log(err);
  }
};
