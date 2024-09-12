import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth";
import { ButtonComponent } from "../../common/components";
import { useCookies } from "react-cookie";

const { logout } = AuthService.getInstance();

export const HomePage = () => {
  const navigate = useNavigate();
  const [_user, __user, removeUserCookie] = useCookies(["user"]);
  const [_token, __token, removeTokenCookie] = useCookies(["access_token"]);

  const signOut = async () => {
    try {
      await logout();
      removeUserCookie("user");
      removeTokenCookie("access_token");
      navigate("/onboarding");
    } catch (error) {
      console.log(`Error logout`, error);
    }
  };

  return (
    <div>
      <ButtonComponent action={signOut} color="primary" text="Cerrar sesion" />
    </div>
  );
};
