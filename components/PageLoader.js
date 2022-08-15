import { Transition } from "@headlessui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function PageLoader(props) {
  const [pageAnimation, setPageAnimation] = useState({ opacity: 1 });
  const [roundedWhiteAnimation, setRoundedWhiteAnimation] = useState({
    borderRadius: 0,
  });
  const [imageAnimation, setImageAnimation] = useState({ y: 0, opacity: 1 });
  const [slideAnimation, setSlideAnimation] = useState({
    y: `100%`,
    opacity: 1,
  });

  useEffect(() => {
    setTimeout(function () {
      setImageAnimation({ y: -80, opacity: 0 });
    }, 1000);

    setTimeout(function () {
      setSlideAnimation({ y: "-13rem", opacity: 1 });
      setRoundedWhiteAnimation({
        borderRadius: "0 0 400% 400%",
      });
    }, 800);

    setTimeout(function () {
      setPageAnimation({ opacity: 0 });
    }, 1800);
  }, []);

  return (
    <>
      <motion.div
        animate={pageAnimation}
        transition={{ duration: 0.5 }}
        className="fixed w-full h-full flex items-center bg-white top-0 left-0 justify-center pointer-events-none z-40"
      >
        <motion.div animate={imageAnimation} transition={{ duration: 0.5 }}>
          <Image src="/noomea-logo-black.svg" height={200} width={200} />
        </motion.div>
        <motion.div
          initial={false}
          animate={slideAnimation}
          transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
          className="fixed w-full h-full flex items-center bg-[#372e3a] top-0 left-0 justify-center"
          style={{
            height: "calc(100% + 13rem)",
          }}
        >
          <motion.div
            animate={roundedWhiteAnimation}
            transition={{ duration: 2 }}
            className="absolute w-full h-52 flex items-center bg-white -top-2 left-0 justify-center"
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default PageLoader;
