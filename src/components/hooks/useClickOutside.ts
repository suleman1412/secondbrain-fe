import { useEffect } from "react";

type ClickOutsideHandler = (event: Event) => void;

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: ClickOutsideHandler
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};