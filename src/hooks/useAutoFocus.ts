import { useEffect, useRef } from "react";

const useAutoFocus = () => {
  const elementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    elementRef.current?.focus();
  }, [elementRef]);

  return elementRef;
};

export default useAutoFocus;
