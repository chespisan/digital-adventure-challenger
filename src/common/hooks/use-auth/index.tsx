import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useModalStore } from "../../context/hooks";

export const useAuth = () => {
  const [userCookie] = useCookies(["user"]);
  const [tokenCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleModal } = useModalStore((state) => state);

  const redirectUserProvitional = () => {
    if (location.pathname === "/auth") {
      return;
    }
    navigate("/home", { replace: true });
  };

  const redirectUserAuth = () => {
    if (tokenCookie.access_token) {
      if (
        location.pathname === "/onboarding" ||
        location.pathname === "/auth"
      ) {
        navigate("/home", { replace: true });
        return;
      }
      return;
    }
    navigate("/onboarding", { replace: true });
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
    navigate("/onboarding", { replace: true });
  };

  const verifyRoutes = () => {
    const listPublicRoutes = ["/home", "/auth", "/onboarding"];
    let isVerify: boolean = true;
    if (!listPublicRoutes.includes(location.pathname)) {
      isVerify = false;
      return;
    }
    return isVerify;
  };

  useEffect(() => {
    if (!tokenCookie.access_token && userCookie.user && !verifyRoutes()) {
      toggleModal({
        title: "Ups!",
        message: "Inicia sesion para poder acceder",
      });
      navigate("/home");
    }
  }, [location.pathname, tokenCookie.access_token]);

  useEffect(() => {
    verifyAuth();
  }, []);
};
