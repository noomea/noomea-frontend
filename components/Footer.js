import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function Footer(props) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className="container mx-auto py-24 border-white/10 border-t-4 relative">
        <div className="text-center">
          <a
            href="https://solana.com/summercamp"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer "
          >
            <div className="group-active:scale-90 relative transition-all">
              <Image
                src="/solana-summer-hackathon.png"
                width="216"
                height="113"
              />
            </div>
          </a>
          <Socials
            twitter="https://twitter.com/Noomea_io"
            twitch="https://www.twitch.tv/noomea_io"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Footer;

const Socials = (props) => {
  const { twitter, twitch } = props;
  return (
    <div className="inline-flex items-center justify-center mt-8 space-x-6">
      {twitter && (
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-centerinline-block active:scale-90 transition"
        >
          <svg
            class="w-6 h-6 text-white/60 hover:text-white transition fill-current inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>
      )}

      {twitch && (
        <a
          href={twitch}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center inline-block active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-white/60 hover:text-white transition fill-current inline-block relative top-2"
            viewBox="0 0 24 24"
          >
            <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
            <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
          </svg>
        </a>
      )}
    </div>
  );
};
