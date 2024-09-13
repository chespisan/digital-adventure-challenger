import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ButtonComponent } from "../../common/components";

import "./onboarding.scss";

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [_user, setUserCookie] = useCookies(["user"]);

  const goToPage = (path: string): void => {
    if (path === "/home") {
      setUserCookie("user", { isAuth: true, isProvitional: true });
    }
    navigate(path);
  };

  return (
    <div className="onboarding">
      <div className="onboarding__info">
        <p className="onboarding__text">
          La fotografía es la historia que <br /> quedara de tus momentos más
          preciosos
        </p>
      </div>
      <div className="onboarding__actions">
        <ButtonComponent
          action={() => goToPage("/home")}
          color="secondary"
          text="Ver"
        />
        <ButtonComponent
          action={() => goToPage("/auth")}
          color="primary"
          text="Ingresar"
        />
      </div>
    </div>
  );
};
