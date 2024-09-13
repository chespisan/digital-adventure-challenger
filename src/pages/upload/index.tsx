import { ChangeEvent } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "sonner";

import { useUser } from "../../common/hooks";
import { PhotoManagementService } from "../../services/photo";

import "./upload.scss";

const photoManagementService = PhotoManagementService.getInstance();

export const UploadPage = () => {
  const { user } = useUser();

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event?.target?.files[0];

      const res = await photoManagementService.uploadPhoto(file, user);
      if (res?.isError) {
        toast.error("Ups, no se pudo guardar, intenta de nuevo");
        return;
      }
      toast.success("Imagen guardada!");
    }
  };

  return (
    <div className="upload">
      <div className="upload__container-file">
        <h2 className="upload__title">Subir fotos</h2>
        <div className="upload__content">
          <FaUpload className="upload__icon" />
          <p className="upload__text">Click aqui</p>
          <div className="upload__container-input" id="upload-file">
            <input
              type="file"
              name="upload-file"
              aria-label="Archivo"
              onChange={uploadFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
