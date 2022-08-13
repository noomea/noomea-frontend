import { motion } from "framer-motion";
import Image from "next/image";

export default function WaitingPage() {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col">
            <Image src="/noomea-logo.svg" width="140" height="60" />
            <div className="text-xs font-normal text-white/50 mt-2">
              A new economy for content creators
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
