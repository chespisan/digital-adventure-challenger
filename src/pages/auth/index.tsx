import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

import { ButtonComponent, InputComponent } from "../../common/components";
import { AuthService } from "../../services/auth";
import { UserAuthExtends } from "../../services/auth/interface";
import { IFormInput } from "./interface";

import "./auth.scss";

const { login, register } = AuthService.getInstance();

export const AuthPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [, setUserCookie] = useCookies(["user"]);
  const [, setTokenCookie] = useCookies(["access_token"]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const toggleForm = (): void => setIsRegister(!isRegister);

  const onSubmit: SubmitHandler<IFormInput> = async (data): Promise<void> => {
    let service;
    if (isRegister) {
      service = register;
    } else {
      service = login;
    }

    try {
      const userData: UserAuthExtends = await service(
        data.email,
        data.password
      );
      setTokenCookie("access_token", userData.accessToken, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
      });
      const profile = {
        email: userData.user.email,
        uid: userData.user.uid,
        isAuth: true,
      };
      setUserCookie("user", JSON.stringify(profile));
      navigate("/home", { replace: true });
    } catch (error: any) {
      setErrorMessage("Email o contraseña incorrecta");
    }
  };

  return (
    <div className="sign">
      <div className="sign__form">
        <h1 className="sign__title">Bienvenidos</h1>

        <form className="sign__inputs">
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            }}
            render={({ field: { name, onChange, value } }) => (
              <InputComponent
                label="Ingresar email"
                action={onChange}
                value={value}
                name={name}
                placeholder="example@email.com"
                type="email"
                isError={errors.email ? true : false}
                errorMessage="Email no valido"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { name, onChange, value } }) => (
              <InputComponent
                label="Ingresar contraseña"
                action={onChange}
                value={value}
                name={name}
                placeholder="****"
                type="password"
                isError={errors.password ? true : false}
                errorMessage="Contraseña invalida, min 3 caracteres"
              />
            )}
          />

          <div className="sign__button">
            <ButtonComponent
              color="primary"
              text={isRegister ? "Registrarme" : "Ingresar"}
              action={handleSubmit(onSubmit)}
            />
            <p className="sign__error-message">{errorMessage}</p>
          </div>
        </form>

        {isRegister ? (
          <p>
            ¿Ya tiens una cuenta?{" "}
            <a onClick={toggleForm}>
              <strong>Ingresar</strong>
            </a>
          </p>
        ) : (
          <p>
            ¿No tienes cuenta?{" "}
            <a onClick={toggleForm}>
              <strong>Regístrate</strong>
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
