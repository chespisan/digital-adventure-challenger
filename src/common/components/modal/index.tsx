import { useNavigate } from "react-router-dom";

import { ButtonComponent } from "../button";
import { useModalStore } from "../../context/hooks";

import "./modal.scss";

export const ModalComponent = () => {
  const navigate = useNavigate();
  const { info, toggleModal } = useModalStore((state) => state);

  const closeModal = () => {
    toggleModal();
  };

  const goToAuth = () => {
    toggleModal();
    if (info?.action) {
      info.action();
      return;
    }
    navigate("/auth", { replace: true });
  };
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__close" onClick={closeModal}>
          X
        </div>
        <h1 className="modal__title">{info?.title}</h1>
        <div className="modal__body">
          {info?.message}
          <ButtonComponent
            action={goToAuth}
            color="primary"
            text={info?.actionText || "Ingresar"}
          />
        </div>
      </div>
    </div>
  );
};
