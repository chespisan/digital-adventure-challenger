import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaHeart, FaPaperPlane } from "react-icons/fa";
import { FaRegFaceGrinTongueSquint } from "react-icons/fa6";
import { toast } from "sonner";

import { useScreenSize, useUser } from "../../common/hooks";
import { PhotoManagementService } from "../../services/photo";
import { IPhoto } from "../../services/photo/interface";

import "./home.scss";

const photoService = PhotoManagementService.getInstance();

export const HomePage = () => {
  const navigate = useNavigate();
  const { getUserId } = useUser();
  const { width } = useScreenSize();
  const [gallery, setGallery] = useState<IPhoto[]>();

  const goToPage = (path: string) => {
    navigate(path);
  };

  const getAllGallery = async () => {
    const res = await photoService.getAllGallery();
    if (res?.isError) {
      toast.error("Hey, intenta de nuevo!");
      return;
    }
    if (res?.galleryPhotos) {
      setGallery(res.galleryPhotos);
    }
  };

  const addLike = async (photo: IPhoto) => {
    const userId = getUserId();
    const res = await photoService.addLikeToPhoto(photo, userId);
    if (res?.isError) {
      toast.error("Hey, intenta de nuevo!");
      return;
    }
    getAllGallery();
    toast.success(res?.message);
  };

  useEffect(() => {
    getAllGallery();
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        {gallery?.map((photo) => (
          <div key={photo.id} className="home__card">
            <div className="home__nickname">
              <FaRegFaceGrinTongueSquint size={14} />
              {photo.username}
            </div>
            <div className="home__card-img">
              <img
                className="home__img"
                src={photo.path}
                alt="image card"
                width={width > 768 ? "300px" : "400px"}
                height={width > 768 ? "300px" : "400px"}
                sizes="(max-width: 640px) 400px,
                        800px"
              />
            </div>
            <div className="home__actions-card">
              <div>
                <FaHeart
                  color={
                    photo?.usersLike?.includes(getUserId()) ? "red" : "black"
                  }
                  onClick={() => addLike(photo)}
                  size="16"
                />
                {photo.likes}
              </div>
              <FaPaperPlane size="16" />
            </div>
          </div>
        ))}
        {gallery?.length === 0 && (
          <h1 className="home__not-gallery">Ups.... ya vienen en camino!!</h1>
        )}
      </div>

      <button className="button-float" onClick={() => goToPage("/photo")}>
        <FaCamera className="button-float__icon" />
      </button>
    </div>
  );
};
