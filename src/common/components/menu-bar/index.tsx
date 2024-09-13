import {
  FaCameraRetro,
  FaTh,
  FaSignOutAlt,
  FaInfoCircle,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../../../services/auth";

import "./menuBar.scss";
import { useCookies } from "react-cookie";

const { logout } = AuthService.getInstance();

export const MenuBarComponent = () => {
  const navigate = useNavigate();
  const [_user, __user, removeUserCookie] = useCookies(["user"]);
  const [_token, __token, removeTokenCookie] = useCookies(["access_token"]);

  const goToPage = (path: string): void => {
    navigate(path);
  };

  const signOut = async () => {
    try {
      await logout();
      removeUserCookie("user");
      removeTokenCookie("access_token");
      navigate("/onboarding", { replace: true });
    } catch (error) {
      console.log(`Error logout`, error);
    }
  };

  return (
    <div className="menu-bar">
      <FaCameraRetro
        className="menu-bar__icon"
        onClick={() => goToPage("upload")}
      />
      <FaUser className="menu-bar__icon" />
      <FaTh className="menu-bar__icon" />
      <FaInfoCircle className="menu-bar__icon" />
      <FaSignOutAlt className="menu-bar__icon" onClick={signOut} />
    </div>
  );
};
