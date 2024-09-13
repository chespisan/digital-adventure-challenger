import { getDownloadURL, ref } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { FirebaseService } from "../firebase";
import { db, storage } from "../../config/firebase";
import { IUseUser } from "../../common/hooks/use-user/interface";
import { IPhoto, IPhotoService } from "./interface";
import { toast } from "sonner";

export class PhotoManagementService implements IPhotoService {
  private static _instance: PhotoManagementService;
  private firebase: FirebaseService;

  constructor() {
    this.firebase = FirebaseService.getInstance();
  }

  public static getInstance(): PhotoManagementService {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  async uploadPhoto(file: Blob | File, user: IUseUser | undefined) {
    try {
      const path = `${import.meta.env.VITE_FOLDER_BUCKET_FB}/${
        user?.username
      }-${uuidv4()}`;
      await this.firebase.upload(file, path);

      const finalPath = await getDownloadURL(ref(storage, path));

      await this.firebase.saveDatabase(import.meta.env.VITE_STORAGE_PHOTO_FB, {
        path: finalPath,
        ext: ".jpg",
        userId: user?.id,
        likes: 0,
        isShowGallery: true,
        username: user?.username,
        usersLike: [],
      });
      return { message: "Foto guardada!" };
    } catch (error) {
      return {
        isError: true,
      };
    }
  }

  async getAllGallery() {
    try {
      const galleryPhotos: IPhoto[] = await this.firebase.findDatabase(
        import.meta.env.VITE_STORAGE_PHOTO_FB
      );
      return {
        galleryPhotos,
      };
    } catch (error) {
      return {
        isError: true,
      };
    }
  }

  async addLikeToPhoto(photo: IPhoto, userId: string) {
    try {
      const photoRef = doc(db, import.meta.env.VITE_STORAGE_PHOTO_FB, photo.id);

      let totalLikes: string[] = [];
      let isDislike = false;

      if (photo?.usersLike?.includes(userId)) {
        isDislike = true;
        totalLikes = photo.usersLike.filter((like) => like !== userId);
      } else {
        totalLikes = [...photo.usersLike, userId];
      }

      await updateDoc(photoRef, {
        likes: isDislike ? photo.likes - 1 : photo.likes + 1,
        usersLike: [...totalLikes],
      });
      return {
        message: "Ohhh!",
      };
    } catch (error) {
      toast.error("Ha ocurrido un error, intenta de nuevo");
      return {
        isError: true,
      };
    }
  }
}
