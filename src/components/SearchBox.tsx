import { motion } from "framer-motion";
import { useRef } from "react";
import { useClickOutside } from "./hooks/useClickOutside";
import OverlayWrapper from "./ui/Overlay";
import { Search } from "lucide-react";

export default function SearchBox({
  close,
}: {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const searchboxRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchboxRef, () => close(false));
  return (
    <OverlayWrapper>
      <motion.div
        initial={{ y: "-10%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-5%", opacity: 0 }}
        className=" p-[15vh] text-[#939AA7] h-full">
        <div
          className="max-w-xl mx-auto divide-y divide-[#939AA7] bg-[#1e293b] rounded-md"
          ref={searchboxRef}>
          <div className="relative flex justify-between px-4 py-2 text-sm ">
            <div className="flex items-center w-full gap-2 text-white">
              <Search size={20} />
              <input
                type="text"
                className="w-full h-full p-2 bg-transparent focus-within:outline-none"
                placeholder="Search Documentation"
              />
            </div>
            <div className="absolute -translate-y-1/2 right-4 top-1/2 ">
              <kbd className="p-1 text-xs rounded-[4px] bg-[#475569] font-sans font-semibold text-slate-400">
                <abbr title="Escape" className="no-underline ">
                  Esc{" "}
                </abbr>{" "}
              </kbd>
            </div>
          </div>
          <div className="flex items-center justify-center p-10 text-center ">
            <h2 className="text-xl">
              How many licks does it take to get to the center of a Tootsie pop?
            </h2>
          </div>
        </div>
      </motion.div>
    </OverlayWrapper>
  );
}
