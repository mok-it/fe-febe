import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestoration = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);
};
