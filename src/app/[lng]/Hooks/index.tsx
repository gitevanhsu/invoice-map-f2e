import { useState, useEffect, useRef } from "react";

// check component call on client side
export function useIsServerSide() {
  const [isServerSide, setIsServerSide] = useState<boolean>(true);

  useEffect(() => {
    setIsServerSide(false);
  }, []);
  return isServerSide;
}

// check user click outside of component
export function useClickOutSide(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, callback]);
  return ref;
}
