import React from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";
import { FormattedMessage } from "react-intl";

function ApplyForCreator(props) {
  return (
    <a
      href="https://forms.gle/GqpvT7hj6VerpqwF8"
      target="_blank"
      className="bg-gradient-to-r from-[#ff00b1]  to-[#ff6abf] rounded-2xl max-w-2xl mx-auto px-8 py-4 flex items-center hover:opacity-80 cursor-pointer active:scale-95 transition-all"
    >
      <UserGroupIcon className="w-10 h-10 mr-6 text-black/40" />
      <div className="flex-1">
        <h5 className="text-lg font-medium">
          <FormattedMessage id="creator.apply.title" />
        </h5>
        <p className="text-white/80 text-sm">
          <FormattedMessage id="creator.apply.description" />
        </p>
      </div>
      <ArrowNarrowRightIcon className="w-10 h-10" />
    </a>
  );
}

export default ApplyForCreator;
