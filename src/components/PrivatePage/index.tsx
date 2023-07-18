import { useRouter } from "next/router";
import { useEffect } from "react";

function PrivatePage({ children }) {
  const router = useRouter();

  useEffect(() => {
    function isAuthenticated() {
      if (typeof window !== "undefined") {
        const auth = JSON.parse(localStorage.getItem("token"));
        return auth;
      }
      return false;
    }

    if (!isAuthenticated()) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}

export default PrivatePage;
