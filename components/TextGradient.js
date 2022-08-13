import React from "react";

function TextGradient(props) {
  const { children } = props;

  return (
    <span
      className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00b1]  to-[#ff6abf]"
      {...props}
    >
      {children}
    </span>
  );
}

export default TextGradient;
