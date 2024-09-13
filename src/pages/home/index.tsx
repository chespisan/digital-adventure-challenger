import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaCamera, FaHeart, FaPaperPlane } from "react-icons/fa";

import { MenuBarComponent } from "../../common/components";
import { PhotoManagementService } from "../../services/photo";
import { IPhoto } from "../../services/photo/interface";

import "./home.scss";

export const HomePage = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<IPhoto[]>();

  const goToPage = (path: string) => {
    navigate(path);
  };

  const geAllGallery = async () => {
    const res = await PhotoManagementService.getInstance().getAllGallery();
    if (res?.isError) {
      return;
    }
    if (res?.galleryPhotos) {
      setGallery(res.galleryPhotos);
    }
  };

  useEffect(() => {
    geAllGallery();
  }, []);

  return (
    <div className="home">
      <MenuBarComponent />

      <div className="home__container">
        {gallery?.map((photo) => (
          <div key={photo.id} className="home__card">
            <div className="home__card-img">
              <img
                className="home__img"
                src={photo.path}
                alt="image card"
                width="400"
                height="400"
                sizes="(max-width: 640px) 400px,
                        800px"
              />
            </div>
            <div className="home__actions-card">
              <div>
                <FaHeart size="16" />
                {photo.likes}
              </div>
              <FaPaperPlane size="16" />
            </div>
          </div>
        ))}
      </div>

      <button className="button-float" onClick={() => goToPage("/photo")}>
        <FaCamera className="button-float__icon" />
      </button>
      <Outlet />
    </div>
  );
};
