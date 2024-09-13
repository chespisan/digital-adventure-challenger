import { FaCameraRetro, FaTh, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { AuthService } from "../../../services/auth";
import { useModalStore } from "../../context/hooks";

import "./menuBar.scss";
import { toast } from "sonner";

const { logout } = AuthService.getInstance();

export const MenuBarComponent = () => {
  const navigate = useNavigate();
  const [_user, __user, removeUserCookie] = useCookies(["user"]);
  const [token, __token, removeTokenCookie] = useCookies(["access_token"]);
  const { toggleModal } = useModalStore((state) => state);

  const goToPage = (path: string): void => {
    navigate(path);
  };

  const confirmLogout = async () => {
    try {
      await logout();
      removeUserCookie("user");
      removeTokenCookie("access_token");
      navigate("/onboarding", { replace: true });
    } catch (error) {
      toast.error("Ha ocurrido un error, intenta de nuevo");
    }
  };

  const signOut = async () => {
    if (!token.access_token) {
      toggleModal({
        title: "Ups!",
        message: "Inicia sesion para poder acceder",
      });
      return;
    }

    toggleModal({
      title: "Hey!",
      message: "¿Estas seguro de cerrar sesión?",
      action: confirmLogout,
      actionText: "Confirmar",
    });
  };

  return (
    <div className="menu-bar">
      <FaCameraRetro
        className="menu-bar__icon"
        onClick={() => goToPage("/upload")}
      />
      <FaTh className="menu-bar__icon" onClick={() => goToPage("/home")} />
      <FaSignOutAlt className="menu-bar__icon" onClick={signOut} />
    </div>
  );
};
