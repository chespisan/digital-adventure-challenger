import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
  const [userCookie] = useCookies(["user"]);
  const [tokenCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  let location = useLocation();

  const redirectUserProvitional = () => {
    if (location.pathname === "/auth") {
      return;
    }
    navigate("/home");
  };

  const redirectUserAuth = () => {
    if (tokenCookie.access_token) {
      if (
        location.pathname === "/onboarding" ||
        location.pathname === "/auth"
      ) {
        navigate("/home");
        return;
      }
      return;
    }
    navigate("/onboarding");
  };

  const verifyAuth = () => {
    if (userCookie?.user?.isAuth) {
      if (userCookie?.user?.isProvitional) {
        redirectUserProvitional();
        return;
      }
      redirectUserAuth();
      return;
    }
    navigate("/onboarding");
  };

  useEffect(() => {
    verifyAuth();
  }, []);
};
