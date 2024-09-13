import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";

import { useScreenSize, useUser } from "../../common/hooks";
import { PhotoManagementService } from "../../services/photo";

import "./photo-management.scss";

const photoManagementService = PhotoManagementService.getInstance();

export const PhotoManagementPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const videoDiv = useRef<HTMLVideoElement | null>(null);
  const photoDiv = useRef<HTMLCanvasElement | null>(null);
  const [isPhoto, setIsPhoto] = useState(false);
  const [stream, setStream] = useState<MediaStream>();

  const showCamera = async () => {
    try {
      const constraints = {
        audio: false,
        video: {
          width: width > 500 ? 1920 : 1080,
          height: width > 500 ? 1080 : 1920,
        },
      };

      const result = await navigator.mediaDevices.getUserMedia(constraints);
      let myVideo = videoDiv.current;
      if (myVideo) {
        myVideo.srcObject = result;
        myVideo.play();
        setStream(result);
      }
    } catch (error) {
      console.log("error-show-camera", error);
    }
  };

  const takePhoto = () => {
    let video = videoDiv.current;
    let photo = photoDiv.current;
    if (photo && video) {
      photo.width = width;
      photo.height = (width / video.videoWidth) * video.videoHeight;
      let context = photo.getContext("2d");
      context?.drawImage(video, 0, 0, photo.width, photo.height);
    }
    setIsPhoto(true);
  };

  const removePhoto = () => {
    let photo = photoDiv.current;
    if (photo) {
      let context = photo?.getContext("2d");
      context?.clearRect(0, 0, photo.width, photo.height);
      setIsPhoto(false);
    }
  };

  const generateBlobFile = () => {
    let imageSrc = photoDiv.current?.toDataURL("image/jpg");
    if (imageSrc) {
      let blobBin = atob(imageSrc.split(",")[1]);
      let array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: "image/jpg" });
    }
  };

  const uploadPhoto = async () => {
    const file = generateBlobFile();
    if (file) {
      const res = await photoManagementService.uploadPhoto(file, user);
      if (res?.isError) {
        toast.success("No se pudo guardar, intenta de nuevo");
        removePhoto();
        return;
      }
      toast.info("Imagen guardada!");
    }
    removePhoto();
  };

  const closePhotoManagement = () => {
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
      navigate(-1);
    });
  };

  useEffect(() => {
    showCamera();
  }, []);

  return (
    <div className="photo">
      <div className="photo__close" onClick={closePhotoManagement}>
        <p className="photo__close-text">X</p>
      </div>
      <div className="photo__container-video">
        <video
          className="photo__video"
          style={{ display: isPhoto ? "none" : "block" }}
          ref={videoDiv}
        />
        <canvas
          className="photo__video"
          style={{ display: isPhoto ? "block" : "none" }}
          ref={photoDiv}
        />
      </div>
      <div className="photo__actions">
        <button
          className="photo__button-circle photo__button-circle--icon photo__button-circle--close"
          onClick={removePhoto}
        >
          {isPhoto && <p className="photo__icon-button">X</p>}
        </button>

        <button className="photo__button-circle" onClick={takePhoto}>
          <div className="photo__button--content"></div>
        </button>

        <button
          className="photo__button-circle photo__button-circle--icon photo__button-circle--check"
          onClick={uploadPhoto}
        >
          {isPhoto && <FaCheck className="photo__icon-button" />}
        </button>
      </div>
    </div>
  );
};
