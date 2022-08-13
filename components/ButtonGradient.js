import React from "react";
import clsx from "clsx";

import { Spinner } from "./Spinner";

function ButtonGradient(props) {
  const { children, disabled, loading, classNameProp } = props;

  let bgClasses = disabled
    ? "from-[#a9a9a9] via-[#a9a9a9] to-[#a9a9a9]"
    : "from-[#ff439e] via-[#FF5FAC] to-[#FF909F]";

  return (
    <>
      <button
        className={clsx(
          `transition relative inline-block font-bold rounded-lg px-7 py-3 text-xs bg-gradient-to-r hover:bg-[#cb337c] hover:bg-none cursor-pointer group ${bgClasses}`,
          {
            [classNameProp]: classNameProp,
            ["pointer-events-none text-black/40 opacity-40"]: disabled,
          }
        )}
        {...props}
      >
        <div className="group-active:scale-90 relative transition-all">
          <span>{children}</span>
        </div>
        {loading && (
          <div
            className={`absolute w-full h-full top-0 left-0 items-center bg-gradient-to-r justify-center flex rounded-lg ${bgClasses}`}
          >
            <Spinner />
          </div>
        )}
      </button>
    </>
  );
}

export default ButtonGradient;
