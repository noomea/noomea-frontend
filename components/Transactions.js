import React, { useEffect, useState } from "react";
import { CheckIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import { formatDistance } from "date-fns";
import { en, fr } from "date-fns/locale";

import { getAmountFromTransaction, getTransaction } from "../api/solanaRPC";
import { displayAddress } from "../utils";
import { LIMIT_TRANSACTIONS_PROFILE } from "../variables";
import { Spinner } from "./Spinner";
import { FormattedMessage, useIntl } from "react-intl";

function Transactions(props) {
  const { signatures } = props;
  const { publicKey } = useWallet();
  const intl = useIntl();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetTransactions = async () => {
    setLoading(true);
    let tempTransactions = [];
    for (const signature of signatures) {
      const result = await getTransaction(signature);
      tempTransactions.push(result?.data?.result);
    }
    setTransactions(tempTransactions);
    setLoading(false);
  };

  useEffect(() => {
    if (!signatures?.length) return;
    handleGetTransactions();
  }, [signatures]);

  if (loading || !signatures?.length) {
    return (
      <div className="bg-black/20 h-32 rounded-lg flex justify-center items-center text-sm text-white/30">
        {loading ? (
          <Spinner text={intl.formatMessage({ id: "wallet.loading" })} />
        ) : (
          intl.formatMessage({ id: "transactions.no_result" })
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto relative rounded-lg">
      <table className="w-full text-sm text-left text-white/70">
        <thead className="text-xs uppercase bg-black/40">
          <tr>
            <th scope="col" className="py-3 px-6">
              <FormattedMessage id="transactions.address" />
            </th>
            <th scope="col" className="py-3 px-6">
              <FormattedMessage id="transactions.type" />
            </th>
            <th scope="col" className="py-3 px-6">
              <FormattedMessage id="transactions.date" />
            </th>
            <th scope="col" className="py-3 px-6">
              <FormattedMessage id="transactions.status" />
            </th>
            <th scope="col" className="py-3 px-6">
              <FormattedMessage id="transactions.amount" />
            </th>
            <th scope="col" className="py-3 px-6">
              <FormattedMessage id="transactions.signature" />
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              className="bg-black/20 hover:bg-black/10"
              key={`${transaction.transaction.signatures[0]}-${index}`}
            >
              <td className="py-4 px-6 font-medium text-pink-500 whitespace-nowrap ">
                <a
                  href={`https://solscan.io/account/${publicKey}`}
                  target="_blank"
                  className="text-pink-500 hover:underline"
                >
                  {displayAddress(publicKey)}
                </a>
              </td>
              <td className="py-4 px-6">
                <FormattedMessage id="transactions.type.claiming" />
              </td>
              <td className="py-4 px-6  whitespace-nowrap">
                {transaction?.blockTime
                  ? formatDistance(transaction.blockTime * 1000, new Date(), {
                      addSuffix: true,
                      locale: intl.locale === "fr" ? fr : en,
                    })
                  : "/"}
              </td>
              <td className="py-4 px-6">
                <div className="inline-flex items-center py-1.5 px-3 mr-2 font-medium text-green-300/90 bg-green-700/40 rounded-full text-xs">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  <span>
                    <FormattedMessage id="transactions.status.success" />
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                {getAmountFromTransaction(transaction)}
              </td>
              <td className="py-4 px-6">
                <a
                  href={`https://solscan.io/tx/${transaction?.transaction.signatures[0]}`}
                  target="_blank"
                  className="text-pink-500 hover:underline"
                >
                  {transaction?.transaction.signatures[0].slice(0, 4) +
                    "..." +
                    transaction?.transaction.signatures[0].slice(-4)}
                </a>
              </td>
            </tr>
          ))}
          {signatures?.length >= LIMIT_TRANSACTIONS_PROFILE && !loading && (
            <tr className="">
              <td colSpan="6" className="text-center p-4 text-xs  bg-black/40">
                <a
                  href="https://solscan.io/account/HECpBfcXC7HycuzYn5KXsqeyVEteVxE6dVPRjko5XgPj#splTransfers"
                  target="_blank"
                  className="text-pink-500 hover:underline inline-flex items-center"
                >
                  <span>
                    <FormattedMessage id="transactions.view_more" />
                  </span>
                  <ExternalLinkIcon className="h-4 w-4 ml-1" />
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
