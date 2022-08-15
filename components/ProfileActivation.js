import React, { useEffect, useState } from "react";
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config";
import ButtonGradient from "./ButtonGradient";
import { FormattedMessage } from "react-intl";

function ProfileActivation(props) {
  const { user } = props;

  if (user.activated) {
    return <Activated />;
  }

  return <ActivationForm user={user} />;
}

export default ProfileActivation;

const Activated = () => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold leading-normal mb-6 inline-flex items-center">
        <CheckCircleIcon className="w-8 h-8 mr-4" />

        <span>Activated</span>
      </h1>
      <h2 className="text text-white/50">
        The page will refresh in {counter} seconds
      </h2>
    </div>
  );
};

const ActivationForm = (props) => {
  const { user } = props;

  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const codeDocRef = doc(db, "code", input);
    const codeDocSnap = await getDoc(codeDocRef);

    setError(!codeDocSnap.exists());
    if (!codeDocSnap.exists()) {
      setLoading(false);
      return;
    }

    const codeDocData = codeDocSnap.data();
    if (codeDocData.used) {
      setError(true);
    } else {
      const userDocRef = doc(db, "user", user.wallet.address);

      await updateDoc(codeDocRef, {
        used: true,
        _updateTimestamp: serverTimestamp(),
      });

      await updateDoc(userDocRef, {
        activation: {
          status: true,
          code: input,
          _updateTimestamp: serverTimestamp(),
        },
        _updateTimestamp: serverTimestamp(),
      });
    }

    setLoading(false);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold leading-normal mb-14">
        <FormattedMessage id="activation.title" />
      </h1>
      <div>
        <form
          className="inline-flex space-x-4 items-center"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="activation_code" className="relative">
              <LockClosedIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-white/20" />
              <input
                name="activation_code"
                id="activation_code"
                placeholder="Activation code"
                className={clsx(
                  `form-input font-medium rounded-lg px-7 pl-12 py-3.5 text-xs bg-black/20 text-white placeholder:text-white/30 w-72`,
                  { [`border-2 border-red-500`]: error }
                )}
                onChange={(event) => setInput(event.target.value)}
                value={input}
              />
            </label>
          </div>
          <div>
            <ButtonGradient disabled={!input.length} loading={loading}>
              <FormattedMessage id="button.confirm" />
            </ButtonGradient>
          </div>
        </form>
        {error && (
          <div className="text-sm text-red-500 mt-4">
            <FormattedMessage id="activation.error" />
          </div>
        )}
      </div>
      <div className="mt-12">
        <a
          href="https://noomea-api.herokuapp.com/generate-code"
          target="_blank"
          className="text-sm font-medium p-4 text-white/60 hover:text-white transition"
        >
          <FormattedMessage id="activation.get_code" />
        </a>
      </div>
    </div>
  );
};
